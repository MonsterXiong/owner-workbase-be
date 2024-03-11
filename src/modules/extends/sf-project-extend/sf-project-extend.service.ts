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

function parseProjectInfo(projectId, projectInfo) {
    if (!projectInfo) {
        return null
    }
    return {
        projectId: projectId ? projectId : nanoid(),
        projectCode: projectInfo.projectCode,
        projectName: projectInfo.projectName,
        projectDescription: projectInfo.projectDescription,

        dbConfig: {
            host: projectInfo?.dbIp || 'localhost',
            port: projectInfo?.dbPort || '3306',
            type: projectInfo?.dbType || 'mysql',
            username: projectInfo?.dbUsername || 'root',
            password: projectInfo?.dbPassword || '123456',
            database: projectInfo?.dbName || 'software_factory_db',
        },

        projectConfig: {
            projectPort: projectInfo.projectPort,
            projectOutputDir: projectInfo.projectOutputDir,
            projectVersion: projectInfo.projectVersion,
            projectFrameworkType: projectInfo.projectFrameworkType,
            prefix: projectInfo?.prefix || 'base/api'
        }
    }
    // 最后拿到的是数据库中的格式
}
function parseMenuInfo(menuInfo, bindProject) {
    if (!menuInfo?.length) {
        return null
    }
    const menuList = menuInfo.map(item => {
        return {
            menuId: item.id,
            // 转换为小驼峰
            menuCode: item.code,
            menuName: item.name,
            parentId: item.parentId,
            menuType: item.menuType,
            menuIcon: item.icon,
            sort: item.order_num,
            bindProject,
        }
    })
    return menuList
}
function parseDataInfo(dataInfo, bindProject) {
    if (!(Array.isArray(dataInfo) && dataInfo.length)) {
        return null
    }
    // 首先过滤掉枚举
    const enumTableList = dataInfo.filter(item => item.modelType == 'enum')
    // 其次收集数据库表和枚举表，方便后续使用
    const enumCategoryList = []
    const enumList = []

    enumTableList.forEach(item => {
        const isSync = 1
        const enumCategoryId = nanoid()
        const enumCategoryItem = {
            enumCategoryId,
            enumCategoryCode: item.code,
            enumCategoryName: item.remark,
            isSync,
            bindProject,
        }
        if (item?.columns?.length) {
            item.columns.forEach(column => {
                const enumItem = {
                    enumId: nanoid(),
                    enumCode: column.code,
                    enumName: column.remark,
                    sort: column.sort,
                    isSync,
                    bindEnumCategory: enumCategoryId,
                    bindProject,
                }
                enumList.push(enumItem)
            })
        }
        enumCategoryList.push(enumCategoryItem)
    })

    return {
        enumCategoryList,
        enumList
    }
}

function getQueryConditionByProject(projectId) {
    const queryConDition = QueryConditionBuilder.getInstanceNoPage()
    queryConDition.buildEqualQuery('bind_project', projectId)
    queryConDition.buildAscSort('sort')
    return queryConDition
}

@Injectable()
export class SfProjectExtendService {
    constructor(private readonly sfProjectService: SfProjectService,
        private readonly sfMenuService: SfMenuService,
        private readonly sfMenuDetailService: SfMenuDetailService,
        private readonly sfEnumService: SfEnumService,
        private readonly sfEnumCategoryService: SfEnumCategoryService,
        private readonly databaseService: DatabaseService,
        private readonly sfProjectConfigService: SfProjectConfigService) { }



    async getProjectConfig(projectId) {
        // 获取项目信息
        const data = await this.sfProjectConfigService.findOneByParam({ bindProject: projectId })
        return data
    }

    async getTableByProjectId(projectId) {
        // 获取项目信息
        const projectConfig = await this.getProjectConfig(projectId)
        const configParam = projectConfig?.configParam
        if (!configParam) {
            return []
        }
        const defaultConfig = JSON.parse(configParam)

        const tableList = await this.databaseService.getTableListByConfig(defaultConfig, defaultConfig.database)
        return tableList.filter(item => !item.name.startsWith('s_'))
    }

    async getFieldByProjectId(projectId, tableName) {
        // 获取项目信息
        const projectConfig = await this.getProjectConfig(projectId)
        const configParam = projectConfig?.configParam
        if (!configParam) {
            return []
        }
        const defaultConfig = JSON.parse(configParam)
        try {
            return await this.databaseService.getFieldListByConfig(defaultConfig, defaultConfig.database, tableName)
        } catch (error) {
            console.log('error-获取数据库字段错误', error);
            return []
        }

    }

    // 通过项目获取数据的json
    async getProjectGenCodeJson(projectId) {
        let projectJsonData = {
            projectInfo: {},
            projectConfig: {},
            menuList: [],
            routesConstantList: [],
            routeList: [],
            pageList: [],
            serviceList: [],
            enumList: [],
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
                console.log('error-获取数据库表错误');
            }
            for await (const tableItem of tableList) {
                fieldMap[tableItem.name] = await this.databaseService.getFieldListByConfig(projectConfigParam, projectConfigParam.database, tableItem.name)
            }
        }

        if (projectParam) {
            projectConfig = { ...JSON.parse(projectParam) }
        }

        const serviceList = tableList?.map(item => {
            const primaryKey = fieldMap[item.name]?.find(fieldItem => fieldItem.Key == 'PRI')?.Field || 'id'
            return {
                camelCaseName: camelCase(item.name),
                pascalCaseName: pascalCase(item.name),
                name: item.comment,
                primaryKey: camelCase(primaryKey),
                prefix: projectConfig?.prefix || 'sfBase'
            }
        })
        const queryCondition = getQueryConditionByProject(projectId)


        // 获取页面菜单信息 以及菜单配置信息

        const enumCategoryInfo = await this.sfEnumCategoryService.queryList(queryCondition as any)
        const enumInfo = await this.sfEnumService.queryList(queryCondition as any)

        const enumList = enumCategoryInfo.map(enumCategoryItem => {
            const enumDataList = enumInfo?.filter(enumItem => enumCategoryItem.enumCategoryId == enumItem.bindEnumCategory) || []
            return {
                name: enumCategoryItem.enumCategoryName,
                camelCode: camelCase(enumCategoryItem.enumCategoryCode),
                constantCode: constantCase(enumCategoryItem.enumCategoryCode),
                list: enumDataList.map(item => {
                    return {
                        name: item.enumName,
                        code: item.enumCode,
                        constantCode: constantCase(item.enumCode),
                    }
                })
            }
        })

        projectJsonData.projectConfig = projectConfig
        projectJsonData.projectInfo = projectInfo

        // 获取页面菜单信息 以及菜单配置信息
        const menuInfo = await this.sfMenuService.queryList(queryCondition as any)

        const menuIds = menuInfo.map(item => item.menuId)

        let menuDetailInfo = await this.sfMenuDetailService.queryList(QueryConditionBuilder.getInstanceNoPage() as any)
        menuDetailInfo = menuDetailInfo.filter(item => menuIds.includes(item.bindMenu))

        const menuData = menuInfo.map(item => {
            let menuDetail = menuDetailInfo.find(menuDetail => menuDetail.bindMenu == item.menuId)?.menuParam
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
            const { menuId, menuName, menuCode, parentId, menuType, menuDetail } = pageItem
            const constantCaseCode = constantCase(menuCode)
            const camelCaseCode = camelCase(menuCode)
            const pascalCaseCode = pascalCase(menuCode)
            const isPage = menuType == 'page'
            menuList.push({
                id: menuId,
                name: menuName,
                code: constantCaseCode,
                parentId: parentId,
                menuType: menuType,
                icon: '',
            })
            if (isPage) {
                routesConstantList.push({
                    code: constantCaseCode,
                    path: `/${camelCaseCode}`,
                    name: pascalCaseCode
                })
                routeList.push({
                    routesConstant: `...baseRoutesConstant.${constantCaseCode}`,
                    filePath: `pages/${camelCaseCode}/${pascalCaseCode}.vue`,
                    name: menuName
                })

                // servicesList 和pageList=>以及创建文件另外进行计算
                pageList.push({
                    name: camelCaseCode,
                    detailParam: menuDetail
                })
            }
        })

        projectJsonData.menuList = menuList
        projectJsonData.routesConstantList = routesConstantList
        projectJsonData.routeList = routeList
        projectJsonData.pageList = pageList
        projectJsonData.serviceList = serviceList
        projectJsonData.enumList = enumList

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
            projectConfigInfo: data
        }
    }

    async syncProjectToSf(projectId, jsonData) {
        // 判断数据库中是否已经有该项目
        // 使用事务
        const { projectInfo, menuInfo, dataInfo, componentInfo } = jsonData
        const projectBo = parseProjectInfo(projectId, projectInfo)
        if (projectBo) {
            await this.sfProjectService.save(projectBo as any)
        }
        const bindProjectId = projectBo.projectId
        const menuBo = parseMenuInfo(menuInfo, bindProjectId)
        if (menuBo) {
            await this.sfMenuService.saveBatch(menuBo as any)
        }
        const dataModelBo = parseDataInfo(dataInfo, bindProjectId)
        if (dataModelBo) {
            const { enumCategoryList, enumList } = dataModelBo
            await this.sfEnumCategoryService.saveBatch(enumCategoryList as any)
            await this.sfEnumService.saveBatch(enumList as any)
        }
        return this.getProjectGenCodeJson(projectId)
    }
}