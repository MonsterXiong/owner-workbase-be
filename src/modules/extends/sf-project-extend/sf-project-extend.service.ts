import { SfProjectConfig } from '../../base/sfProjectConfig/sfProjectConfig.entity';
import { SfProject } from '../../base/sfProject/sfProject.entity';
import { SfProjectService } from '../../base/sfProject/sfProject.service';
import { SfProjectConfigService } from '../../base/sfProjectConfig/sfProjectConfig.service';
import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import * as _ from 'lodash'
import { SfMenuService } from '../../base/sfMenu/sfMenu.service';
import QueryConditionBuilder from '../../../utils/queryConditionBuilder';
import { camelCase, constantCase, pascalCase } from 'change-case';
import { SfMenuDetailService } from '../../base/sfMenuDetail/sfMenuDetail.service';
import { DatabaseService } from '../database/database.service';
import { SfEnumService } from '../../base/sfEnum/sfEnum.service';
import { SfEnumCategoryService } from '../../base/sfEnumCategory/sfEnumCategory.service';

function getQueryConditionByProject(projectId) {
    const queryConDition = QueryConditionBuilder.getInstanceNoPage()
    queryConDition.buildEqualQuery('bind_project',projectId)
    queryConDition.buildAscSort('sort')
    return queryConDition
}

@Injectable()
export class SfProjectExtendService {
    constructor(private readonly sfProjectService: SfProjectService,
        private readonly sfMenuService:SfMenuService,
        private readonly sfMenuDetailService: SfMenuDetailService,
        private readonly sfEnumService:SfEnumService,
        private readonly sfEnumCategoryService: SfEnumCategoryService,
        private readonly databaseService: DatabaseService,
        private readonly sfProjectConfigService: SfProjectConfigService) { }



    async getProjectConfig(projectId) {
        // 获取项目信息
        const data = await this.sfProjectConfigService.findOneByParam({bindProject:projectId})
        return data
    }

    async getTableByProjectId(projectId) {
        // 获取项目信息
        const projectConfig = await this.getProjectConfig(projectId)
        const configParam = projectConfig?.configParam
        if(!configParam){
          return []
        }
        const defaultConfig = JSON.parse(configParam)

       const tableList =  await this.databaseService.getTableListByConfig(defaultConfig,defaultConfig.database)
       return tableList.filter(item=>!item.name.startsWith('s_'))
    }

    async getFieldByProjectId(projectId,tableName) {
        // 获取项目信息
        const projectConfig = await this.getProjectConfig(projectId)
        const configParam = projectConfig?.configParam
        if(!configParam){
          return []
        }
        const defaultConfig = JSON.parse(configParam)
        try {
            return await this.databaseService.getFieldListByConfig(defaultConfig,defaultConfig.database,tableName)
        } catch (error) {
            console.log('error',error);
            return []
        }

    }

    // 通过项目获取数据的json
    async getProjectGenCodeJson(projectId) {
        let projectJsonData = {
            projectInfo: {},
            projectConfig: {},
            menuList: [],
            routesConstantList:[],
            routeList:[],
            pageList:[],
            serviceList:[],
            enumList:[],
        }
        // 通过项目id获取项目信息
        let projectInfo = await this.sfProjectService.findOne(projectId)
        const omitAttrs = [
            'status',
            'isdel',
            'creator',
            'createTime',
            'createIp',
            'updater',
            'updateTime',
            'updateIp',
        ]
        projectInfo = _.omit(_.cloneDeep(projectInfo), omitAttrs)

        // 获取数据配置信息
        let projectConfigInfo = await this.getProjectConfig(projectId)

        let tableList = []
        let fieldMap = {}
        let projectConfig = {
            prefix: ''
            // TODO: 一些项目的名称code,系统名字,端口等
        }
        const configParam = projectConfigInfo?.configParam
        const projectParam = projectConfigInfo?.projectParam
        if (configParam) {
            const projectConfigParam = { ...JSON.parse(configParam) }
            try {
                tableList = await this.getTableByProjectId(projectInfo.projectId)
            } catch (error) {
                console.log('error');
            }
            for await (const tableItem of tableList) {
                fieldMap[tableItem.name] = await this.databaseService.getFieldListByConfig(projectConfigParam,projectConfigParam.database,tableItem.name)
            }
        }

        if (projectParam) {
            projectConfig = { ...JSON.parse(projectParam) }
        }

        const serviceList = tableList?.map(item => {
            const primaryKey = fieldMap[item.name]?.find(fieldItem=>fieldItem.Key == 'PRI')?.Field || 'id'
            return {
                camelCaseName:camelCase(item.name),
                pascalCaseName:pascalCase(item.name),
                name: item.comment,
                primaryKey: camelCase(primaryKey),
                prefix:projectConfig?.prefix || 'sfBase'
            }
        })
        const queryCondition = getQueryConditionByProject(projectId)


      // 获取页面菜单信息 以及菜单配置信息

        const enumCategoryInfo = await this.sfEnumCategoryService.queryList(queryCondition as any)
        const enumInfo = await this.sfEnumService.queryList(queryCondition as any)

        const enumList = enumCategoryInfo.map(enumCategoryItem => {
            const enumDataList = enumInfo?.filter(enumItem=>enumCategoryItem.enumCategoryId == enumItem.bindEnumCategory) || []
            return {
                name: enumCategoryItem.enumCategoryName,
                camelCode:camelCase(enumCategoryItem.enumCategoryCode),
                constantCode: constantCase(enumCategoryItem.enumCategoryCode),
                list: enumDataList.map(item => {
                    return {
                        name: item.enumName,
                        code: item.enumCode,
                        constantCode:constantCase(item.enumCode),
                    }
                })
            }
        })

        projectJsonData.projectConfig = projectConfig
        projectJsonData.projectInfo = projectInfo

        // 获取页面菜单信息 以及菜单配置信息
        const menuInfo = await this.sfMenuService.queryList(queryCondition as any)

        const menuIds = menuInfo.map(item => item.menuId)

        let  menuDetailInfo = await this.sfMenuDetailService.queryList(QueryConditionBuilder.getInstanceNoPage() as any)
        menuDetailInfo = menuDetailInfo.filter(item=>menuIds.includes(item.bindMenu))

        const menuData = menuInfo.map(item => {
            let menuDetail = menuDetailInfo.find(menuDetail=>menuDetail.bindMenu ==item.menuId)?.menuParam
            if (menuDetail) {
                menuDetail = JSON.parse(menuDetail)
            }
            return {
                ...item,
                menuDetail
            }
        })

        const pageInfo = menuData.map(item => _.omit(item, [...omitAttrs, 'bindProject', 'tag', 'remark', 'englishName', 'levelCode', 'sort']))
        const menuList = []
        const routesConstantList = []
        const routeList = []
        const pageList = []
        pageInfo.forEach(pageItem => {
            const { menuId, menuName, menuCode, parentId, menuType,menuDetail } = pageItem
            const constantCaseCode = constantCase(menuCode)
            const camelCaseCode = camelCase(menuCode)
            const pascalCaseCode = pascalCase(menuCode)
            const isPage = menuType == 'page'
            menuList.push({
                id:menuId,
                name:menuName,
                code: constantCaseCode,
                parentId: parentId,
                menuType: menuType,
                icon: '',
            })
            if (isPage) {
                routesConstantList.push({
                    code: constantCaseCode,
                    path: `/${camelCaseCode}`,
                    name:pascalCaseCode
                })
                routeList.push({
                    routesConstant: `...baseRoutesConstant.${constantCaseCode}`,
                    filePath:`pages/${camelCaseCode}/${pascalCaseCode}.vue`,
                    name:menuName
                })

                // servicesList 和pageList=>以及创建文件另外进行计算
                pageList.push({
                    name:camelCaseCode,
                    detailParam: menuDetail
                })
            }
        })

        projectJsonData.menuList= menuList
        projectJsonData.routesConstantList= routesConstantList
        projectJsonData.routeList= routeList
        projectJsonData.pageList= pageList
        projectJsonData.serviceList= serviceList
        projectJsonData.enumList= enumList

        return projectJsonData
    }


    async saveProject(entity: SfProject) {

        const projectInfo = await this.sfProjectService.save(entity)
        const { projectId } = projectInfo
        const configParam = JSON.stringify({
            // 主机
            host: 'localhost',
            // 端口
            port: 3306,
            //  数据库类型
            type: 'mysql',
            username: 'root',
            password: '123456',
            // 数据库
            database: 'workflow_db',

        })
        const projectConfigInfo = {
            projectConfigId: nanoid(),
            bindProject: projectId,
            configParam: configParam,
        }
        const data = await this.sfProjectConfigService.save(projectConfigInfo as SfProjectConfig)
        return {
            ...projectInfo,
            projectConfigInfo:data
        }
    }
}