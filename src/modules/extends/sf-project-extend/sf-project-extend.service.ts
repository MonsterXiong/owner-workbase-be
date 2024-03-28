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
import { SfMenuExtendService } from '../sf-menu-extend/sf-menu-extend.service';

// 解析软件工厂的项目信息
function parseProjectInfo(projectInfo,projectId=nanoid()) {
    if (!projectInfo) {
        return null
    }
    return {
        projectId: projectId,
        projectCode: projectInfo.projectCode,
        projectName: projectInfo.projectName,
        projectDescription: projectInfo.projectDescription,

        configParam: {
            host: '192.168.2.204' || projectInfo?.dbIp || 'localhost',
            port: projectInfo?.dbPort || '3306',
            type: projectInfo?.dbType || 'mysql',
            username: projectInfo?.dbUsername || 'root',
            password: projectInfo?.dbPassword || '123456',
            database: projectInfo?.dbName || 'software_factory_db',
        },

        projectParam: {
            projectPort: projectInfo.projectPort,
            projectOutputDir: projectInfo.projectOutputDir,
            projectVersion: projectInfo.projectVersion,
            projectFrameworkType: projectInfo.projectFrameworkType,
            prefix: projectInfo?.prefix || 'base/api'
        }
    }
    // 最后拿到的是数据库中的格式
}
// 解析软件工厂的菜单信息
function parseMenuInfo(menuInfo, bindProject) {
    if (!menuInfo?.length) {
        return null
    }
    const menuList = menuInfo.map(item => {
        return {
            menuId: item.id,
            // 转换为小驼峰
            menuCode: camelCase(item.code),
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
// 解析软件工厂的物理模型数据信息
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
    queryConDition.buildEqualQuery('bindProject', projectId)
    queryConDition.buildAscSort('sort')
    return queryConDition
}
// 格式化枚举列表
function formatEnumList(enumCategoryList, enumList) {
    return enumCategoryList.map(categoryItem => {
        const enumDataList = enumList?.filter(enumItem=> categoryItem.enumCategoryId == enumItem.bindEnumCategory) || []
        return {
            name: categoryItem.enumCategoryName,
            camelCode: camelCase(categoryItem.enumCategoryCode),
            constantCode: constantCase(categoryItem.enumCategoryCode),
            list: enumDataList.map(item => {
                return {
                    name: item.enumName,
                    code: item.enumCode,
                    constantCode: constantCase(item.enumCode),
                }
            })
        }
    })
}
// 格式化菜单信息获取路由、页面等列表
function formatPageInfo(pageInfo) {
    let pageData = pageInfo
    if (!Array.isArray(pageInfo)) {
        pageData = [pageInfo]
    }
    return pageData.reduce((pre, pageItem) => {
        const { menuId, menuName, menuCode, parentId, menuType, menuParam, sort } = pageItem
        const constantCaseCode = constantCase(menuCode)
        const camelCaseCode = camelCase(menuCode)
        const pascalCaseCode = pascalCase(menuCode)
        const isPage = menuType == 'page'
        pre['menuList'].push({
            id: menuId,
            name: menuName,
            code: constantCaseCode,
            parentId: parentId,
            menuType: menuType,
            icon: '',
            sort
        })
        if (isPage) {
            pre['routesConstantList'].push({
                code: constantCaseCode,
                path: `/${camelCaseCode}`,
                name: pascalCaseCode
            })
            pre['routeList'].push({
                routesConstant: `...baseRoutesConstant.${constantCaseCode}`,
                filePath: `pages/${camelCaseCode}/${pascalCaseCode}.vue`,
                name: menuName
            })
            // servicesList 和pageList=>以及创建文件另外进行计算
            pre['pageList'].push({
                name: camelCaseCode,
                detailParam: menuParam
            })
        }
        return pre
    }, {menuList: [],routesConstantList: [],routeList: [],pageList:[]})
}
// 根据数据库表和字段信息格式化service列表
function formatTableInfo(tableInfo,projectParam) {
    return tableInfo?.map(item => {
        const primaryKey = item.fieldList?.find(fieldItem => fieldItem.Key == 'PRI')?.Field || 'id'
        return {
            camelCaseName: camelCase(item.name),
            pascalCaseName: pascalCase(item.name),
            name: item.comment,
            primaryKey: camelCase(primaryKey),
            prefix: projectParam?.prefix || 'sfBase'
        }
    })
}

function cleanInfo(info,otherAttrs=[]) {
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
    return _.omit(_.cloneDeep(info), [...omitAttrs,...otherAttrs])
}
@Injectable()
export class SfProjectExtendService {
    constructor(
        private readonly sfProjectService: SfProjectService,
        private readonly sfMenuService: SfMenuService,
        private readonly sfMenuExtendService: SfMenuExtendService,
        private readonly sfEnumService: SfEnumService,
        private readonly sfEnumCategoryService: SfEnumCategoryService,
        private readonly databaseService: DatabaseService,
        private readonly sfProjectConfigService: SfProjectConfigService
    ) {}

    // 获取项目配置信息
    async getProjectConfig(projectId):Promise<any> {
        const projectInfo = await this.sfProjectService.findOne(projectId)

        const projectConfigInfo = await this.sfProjectConfigService.findOneByParam({ bindProject: projectId })
        const projectConfig = {
            configParam: null,
            projectParam:null
        }
        if (projectConfigInfo?.configParam) {
            projectConfig.configParam = JSON.parse(projectConfigInfo?.configParam)
        }
        if (projectConfigInfo?.projectParam) {
            projectConfig.projectParam = JSON.parse(projectConfigInfo?.projectParam)
        }
        return {
            ...projectInfo,
            projectConfig
        }
    }
    // 查询当前项目的枚举分类 && 枚举信息
    async getEnumInfoByProjectId(projectId) {
        const queryCondition = getQueryConditionByProject(projectId)
        const enumCategoryList = await this.sfEnumCategoryService.queryList(queryCondition as any)
        const enumDataList = await this.sfEnumService.queryList(queryCondition as any)
        return {
            enumCategoryList,
            enumDataList
        }
    }
    // 查询当前项目的菜单 && 菜单详情信息
    async getMenuInfoByProjectId(projectId) {
        const queryCondition = getQueryConditionByProject(projectId)
        const menuInfo = await this.sfMenuService.queryList(queryCondition as any)
        return await this.sfMenuExtendService.getMenuInfoByIds(menuInfo.map(item => item.menuId))
    }
    // 获取当前项目的数据库表信息
    async getTableByProjectId(projectId) {
        const { projectConfig } = await this.getProjectConfig(projectId)
        const configParam = projectConfig?.configParam
        return await this.databaseService.getTableListByConfig(configParam, configParam.database,false)
    }
    // 根据表名获取当前项目的表字段信息
    async getFieldByProjectId(projectId, tableName) {
        const { projectConfig } = await this.getProjectConfig(projectId)
        const configParam = projectConfig?.configParam
        if (!configParam) {
            return []
        }
        try {
            return await this.databaseService.getFieldListByConfig(configParam, configParam.database, tableName)
        } catch (error) {
            console.log('error-获取数据库字段错误', error);
            return []
        }
    }
    // 根据项目Id获取当前项目的所有表以及对应字段数据
    async getTableAndFieldByProjectId(projectId) {
        const projectInfo = await this.getProjectConfig(projectId)
        const projectConfigInfo = projectInfo.projectConfig
        const configParam = projectConfigInfo?.configParam
        return await this.databaseService.getTableAndFieldByConfig(configParam)
    }
    // 根据项目配置数据获取serviceList
    async getServiceListByProjectConfig(projectConfig) {
        const {configParam,projectParam} = projectConfig
        const tableInfo = await this.databaseService.getTableAndFieldByConfig(configParam)
        return formatTableInfo(tableInfo,projectParam)
    }
    // 通过项目id获取生成代码数据的json
    async getProjectGenCodeJson(projectId) {
        const projectInfo = await this.getProjectConfig(projectId)
        const projectConfigInfo = projectInfo.projectConfig
        // 根据项目配置信息查询数据库表和字段信息，格式出serviceList
        const serviceList = await this.getServiceListByProjectConfig(projectConfigInfo)
        // 查询当前项目的枚举分类 && 枚举信息
        const { enumCategoryList,enumDataList } = await this.getEnumInfoByProjectId(projectId)
        const enumList = formatEnumList(enumCategoryList,enumDataList)
        // 获取当前项目的页面菜单信息 以及菜单配置信息 && 剔除掉没必要的属性
        // const pageInfo = (await this.getMenuInfoByProjectId(projectId)).map(item =>cleanInfo(item, ['bindProject', 'tag', 'remark', 'englishName', 'levelCode']))
        const pageInfo = await this.getMenuInfoByProjectId(projectId)
        // 获取菜单、路由数据
        const { menuList, routesConstantList, routeList, pageList}= formatPageInfo(pageInfo)
        return {
            projectInfo:cleanInfo(projectInfo,['projectConfig']),
            projectConfig:projectConfigInfo,
            serviceList,
            menuList,
            routesConstantList,
            routeList,
            pageList,
            enumList
        }
    }
    // 保存项目 && 项目信息
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
    // 将软件工厂的json转换为工具项目的Json
    async adapterJson(sfJsonData) {
        const { projectInfo: sfProjectInfo, menuInfo: sfMenuInfo, dataInfo: sfDataInfo, componentInfo:sfComponentInfo } = sfJsonData
        const tempProjectId = nanoid()
        const adapterProjectInfo = parseProjectInfo(sfProjectInfo, tempProjectId)
        const adapterProojectConfigInfo =  {
            configParam:adapterProjectInfo.configParam,
            projectParam:adapterProjectInfo.projectParam
        }
        const adapterMenuInfo = parseMenuInfo(sfMenuInfo, tempProjectId)
        const adapterDataModelInfo = parseDataInfo(sfDataInfo, tempProjectId)
        const { enumCategoryList, enumList } = adapterDataModelInfo
        // adapterMenuInfo先去查询一下数据库菜单详情,方便同步工具中的页面配置
        const menuListInfo = await this.sfMenuExtendService.getMenuInfoByIds(adapterMenuInfo.map(item=>item.menuId))
        const { menuList, routesConstantList, routeList, pageList} = formatPageInfo(menuListInfo)
        const serviceList = await this.getServiceListByProjectConfig(adapterProojectConfigInfo)
        return {
            projectInfo: cleanInfo(adapterProjectInfo,['configParam','projectParam']),
            projectConfig: adapterProojectConfigInfo,
            serviceList,
            routeList,
            pageList,
            routesConstantList,
            menuList,
            enumList:formatEnumList(enumCategoryList,enumList)
        }
    }
    // TODO:通过json反推出工具中的数据进行持久化

    // 同步软件工厂项目数据
    async syncProjectToSf(projectId, jsonData) {
        // 判断数据库中是否已经有该项目
        // 使用事务
        const { projectInfo, menuInfo, dataInfo, componentInfo } = jsonData
        const projectBo = parseProjectInfo(projectInfo,projectId )
        // 同步项目信息
        if (projectBo) {
            const pInfo = await this.sfProjectService.save(projectBo as any)
            const { projectConfig } = await this.getProjectConfig(pInfo.projectId)
            const cPInfo = {
                projectConfigId:projectConfig?.projectConfigId || nanoid(),
                configParam: JSON.stringify(projectBo.configParam),
                projectParam: JSON.stringify(projectBo.projectParam),
                bindProject:pInfo.projectId
            }
            await this.sfProjectConfigService.save(cPInfo as SfProjectConfig)
        }
        const bindProjectId = projectBo.projectId
        // 同步菜单信息
        const menuBo = parseMenuInfo(menuInfo, bindProjectId)
        if (menuBo?.length) {
            await this.sfMenuService.saveBatch(menuBo as any)
        }
        // 同步枚举信息=>可扩展同步数据库表，建表生成后端
        const dataModelBo = parseDataInfo(dataInfo, bindProjectId)
        if (dataModelBo) {
            const { enumCategoryList, enumList } = dataModelBo
            // 应该判断是否有这些信息，有则同步，没有则新增
            if (enumCategoryList?.length) {
                await this.sfEnumCategoryService.saveBatch(enumCategoryList as any)
                await this.sfEnumService.saveBatch(enumList as any)
            }
        }
        // return this.getProjectGenCodeJson(projectId)
        return projectInfo.projectId
    }
}