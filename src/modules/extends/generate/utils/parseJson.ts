import { FE_FRAMEWORK_DATA } from './../framework';
import * as changeCase from 'change-case';
const fse = require('fs-extra')
const path = require('path')

const TEMPLATE_MAP = {
    'table_general':[
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
        }
    ]
}

const projectJson = fse.readJsonSync(path.resolve(__dirname,'../../../../mock/allData.json'))

const {projectInfo,menuInfo,dataModel,pages} = projectJson

// const { functionModel, elementConfig } = pages

const {feConfig} = projectInfo

const need_project_data = {
    frameworkType: feConfig.frameworkType,
    name:projectInfo.name,
    code:projectInfo.code,
    version:projectInfo.version,
    description:projectInfo.description,
    // 服务端口
    port:8080
}



const {pathInfo} = FE_FRAMEWORK_DATA[need_project_data.frameworkType]


function hasToolBar(queryList,toolbarBtnList){
    return queryList.length>0 && toolbarBtnList.length>0
}

function getTableHeader(headerList,dataModel){

    const tableMap = dataModel.reduce((res,table)=>{
        res[table.code] = table.cloumns
        return res
    },{})
    
    const tableHeader = []
    headerList.forEach(headerColumn=>{
        const {alias,bindObj,bindAttr,aliasCode,isHidden,displayType} =  headerColumn
        console.log(tableMap[bindObj]);
        
        const name = tableMap[bindObj]?.find(item=>item.code == bindAttr)?.remark || '默认名称'
   
        if(!isHidden){
            tableHeader.push({
                prop:aliasCode?aliasCode:bindAttr,
                label:alias?alias:name,
                type:displayType
            })
        }
    })
    return tableHeader
}

function hasOperateColumn(operateBtnList){
    return operateBtnList.length>0
}
function gtetCategoryBtn(functionModel){
   return functionModel.reduce((res,item)=>{
        if(item.functionClass == 'global'){
            res['toolbarBtnList'].push(item)
        }else if(item.functionClass == 'obj'){
            res['operateBtnList'].push(item)
        }
        return res
    },{
        toolbarBtnList:[],
        operateBtnList:[]
    })
}

// 转换为模板需要的数据
function genPageParams(menuItemInfo,pageList,dataModel){
    const {id,code} = menuItemInfo
    const pageInfo = pageList.find(item=>item.bindMenu === id)
    const {functionModel,elementConfig} = pageInfo
    if(pageInfo.type ==  "table_general"){
        // 
        const templateStruct = TEMPLATE_MAP[pageInfo.type]

        const headerList = elementConfig['list'] 
        const queryList = elementConfig['query'] 

        const functionMap = functionModel.reduce((res,functionItem)=>res[functionItem.funtionType] = functionItem,{})


        const {toolbarBtnList,operateBtnList} = gtetCategoryBtn(functionModel)
        // const toolbarBtnList = functionModel.filter(item=>item.functionClass == )
        const isToolBar = hasToolBar(queryList,toolbarBtnList)
        const isOperateColumn = hasOperateColumn(operateBtnList)
        
        const tableHeader = getTableHeader(headerList,dataModel)

        return {
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
          if(item.functionType == 'page'){
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
            res['pageList'].push(genPageParams(item,pages,dataModel));
           }
        return res
    },init_fileList)

    return menuList
}

const genData = parseTemplateParams(menuInfo)

console.log(genData,'xxxx');

