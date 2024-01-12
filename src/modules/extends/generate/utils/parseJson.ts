import { FE_FRAMEWORK_DATA } from './../framework';
import * as changeCase from 'change-case';
const fse = require('fs-extra')
const path = require('path')
const ejs = require('ejs')
const fs = require('fs/promises');

enum ELEMENT_ENUM {
    LIST='listElement',
    UPDATE='updateElement',
    INSERT='insertElement'
}

enum TEMPLATE_ENUM  {
    CRUD_TABLE='table_general'
}

enum MENU_TYPE_ENUM {
    MODULE = 'module',
    PAGE = 'page'
}

enum FUNCTION_TYPE_ENUM {
    TOOLBAR='global',
    OBJ = 'obj'
}

// 对应特定接口
enum TABLE_FUNCTION_ENUM  {
    // 一定会有查询功能
    QUERY_LIST ='queryList',
    QUERY ='query',
    INSERT ='insert',
    UPDATE ='update',
    DELETE ='delete',
    EXPORT = 'export',
    IMPORT = 'import'

}

// 模板
const TEMPLATE_DATA = {
    [TEMPLATE_ENUM.CRUD_TABLE]:[
        {
            type:'entry',
            templatePath:"public/fe/common/crud.ejs"
        },
        {
            type:'query',
            templatePath:"public/fe/base/queryForm.ejs"
        },
        {
            type:'table',
            templatePath:"public/fe/base/table.ejs"
        },
        {
            type:'dialog',
            templatePath:"public/fe/base/dialog.ejs"
        },
        {
            type:'service',
            templatePath:"public/v2/tableService.ejs"
        }
    ]
}

function parseUrlList(urlList,prikey){
    const result = []
    urlList.forEach(urlItem => {
        result.push(parseUrl(urlItem)) 
    });
    const serviceRenderTempFile = fse.readFileSync('public/template/v2/tableService.ejs','utf8',);
    const serviceRenderTemp = ejs.compile(serviceRenderTempFile)
    const serviceList = result.map(item=>{
        const {label,url,tempParam} = item
        const { functionName } = tempParam
        const content = serviceRenderTemp({functionType:label,functionUrl:url,functionName,prikey})
        return {
            ...item,
            content
        }
    })
    console.log('serviceList',serviceList);
    
    return serviceList
}
function parseUrl(item){
    console.log(item,'item');
    const {url,label} = item
    const [x,interfaceType,serviceType,functionName]=url.split('/')
    console.log(interfaceType,serviceType,functionName);
    return {
        ...item,
        tempParam:{
            interfaceType,
            serviceType,
            functionName
        }
    }
    
    // if(item.label == TABLE_FUNCTION_ENUM.QUERY_LIST){
    //     const  queryUrl = item.queryUrl
    //     return {
    //         functionName:'',
    //         method:''
    //     }
    // }
}




const projectJson = fse.readJsonSync(path.resolve(__dirname,'../../../../mock/projectGenData1.json'))

const {projectInfo,menuInfo,dataModel,pages} = projectJson

// const { functionModel, elementConfig } = pages

const {project_frameworkType,project_name,project_code,project_version,project_description,project_port} = projectInfo

const need_project_data = {
    frameworkType: project_frameworkType,
    name:project_name,
    code:project_code,
    version:project_version,
    description:project_description,
    // 服务端口
    port:project_port
}



const {pathInfo} = FE_FRAMEWORK_DATA[need_project_data.frameworkType]


function hasToolBar(queryList,toolbarBtnList){
    return queryList.length > 0 && toolbarBtnList.length > 0
}

function getTableHeader(headerList,dataModel){

    const tableMap = dataModel.reduce((res,table)=>{
        res[table.code] = table.cloumns
        return res
    },{})

    const tableHeader = []
    headerList.forEach(headerColumn=>{
        const {alias,bindObj,bindAttr,aliasCode,displayType,param} =  headerColumn
        const {isHidden}= param
        const name = tableMap[bindObj]?.find(item=>item.code == bindAttr)?.remark || '默认名称'

        if(!isHidden){
            tableHeader.push({
                prop: aliasCode ? aliasCode : bindAttr,
                label: alias ? alias : name,
                type: displayType
            })
        }
    })
    return tableHeader
}

function getElementItem(elementConfig,bindFunction){
    const elementInfo = elementConfig.find(item=>item.bindFunction == bindFunction)
    return elementInfo?.data || []
}
function hasOperateColumn(operateBtnList){
    return operateBtnList.length>0
}
function gtetCategoryBtn(functionModel){
   return functionModel.reduce((res,item)=>{
        if(item.functionType == FUNCTION_TYPE_ENUM.TOOLBAR){
            res['toolbarBtnList'].push(item)
        }else if(item.functionType == FUNCTION_TYPE_ENUM.OBJ){
            res['operateBtnList'].push(item)
        }
        return res
    },{
        toolbarBtnList:[],
        operateBtnList:[]
    })
}

function getPrimaryKey(headerList){
    const primaryKeyInfo = headerList.find(item=>item.pk)
    if(!primaryKeyInfo){
        throw new Error("没有找到主键信息");
    }
    const { bindAttr,aliasCode} = primaryKeyInfo
    return aliasCode?aliasCode:bindAttr
}

function getUrlList(functionModel){
    return functionModel.reduce((res,item)=>{
        const requestList = item['request']
        res = res.concat(requestList)
        return res
    },[])
}

// 转换为模板需要的数据
// service转换
function genPageParams(menuItemInfo,pageList,dataModel){
    const {id,code} = menuItemInfo
    const pageInfo = pageList.find(item=>item.bindMenu === id)
    if(!pageInfo){
        return null
    }
    const {functionModel,elementConfig} = pageInfo
    
    if(pageInfo.type ==  TEMPLATE_ENUM.CRUD_TABLE){
        //
        const templateStruct = TEMPLATE_DATA[pageInfo.type]

        // const headerList = elementMap[TABLE_FUNCTION_ENUM.QUERY_LIST]
        const headerList = getElementItem(elementConfig,TABLE_FUNCTION_ENUM.QUERY_LIST)
        const prikey = getPrimaryKey(headerList)
        const queryList = headerList.filter(item=>item.param.isSearch)


        const {toolbarBtnList,operateBtnList} = gtetCategoryBtn(functionModel)
        const urlList = getUrlList(functionModel)
        const serviceList = parseUrlList(urlList,prikey)
        // 是否有工具栏
        const isToolBar = hasToolBar(queryList,toolbarBtnList)
        // 是否有操作列
        const isOperateColumn = hasOperateColumn(operateBtnList)

        const tableHeader = getTableHeader(headerList,dataModel)

        return {
            serviceList,
            urlList,
            // 是否有工具栏组件
            isToolBar,
            // 工具栏按钮列表
            toolbarBtnList,
            // 操作栏按钮列表
            operateBtnList,
            // 工具栏快速检索列表
            queryList,
            // 表格头
            tableHeader,
            // 是否有操作列
            isOperateColumn
        }
    }
}

function parseTemplateParams(menuData){
    const init_fileList = {
        menuList:[],
        routeList:[],
        routesConstantList:[],
        pageList:[]
    }
    const menuList = menuData.reduce((res,item)=>{
        const {code} = item
        const CONST_CODE = changeCase.constantCase(code)
        const CAMEL_CASE_CODE = changeCase.camelCase(code)
        const PASCAL_CASE_CODE = changeCase.pascalCase(code)
        const VUE_FILE_NAME = `${CAMEL_CASE_CODE}/${PASCAL_CASE_CODE}.vue`
            res['menuList'].push({
                ...item,
                menuParams: CONST_CODE,
            })
          if(item.menuType == MENU_TYPE_ENUM.PAGE){
            res['routesConstantList'].push({
              const: CONST_CODE,
              path: CAMEL_CASE_CODE,
              name: PASCAL_CASE_CODE,
            })
            res['routeList'].push({
              ...item,
              const: CONST_CODE,
              path: `${pathInfo.page.genDir}/${VUE_FILE_NAME}`,
            })
            const pageInfo = genPageParams(item,pages,dataModel)
            if(pageInfo){
                res['pageList'].push(pageInfo);
            }
           }
        return res
    },init_fileList)

    return menuList
}


    const genData = parseTemplateParams(menuInfo)
    console.log(genData,'xxxx',genData.pageList[0]);

