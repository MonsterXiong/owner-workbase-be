import { camelCase, pascalCase } from "change-case"
import { uniqueArray } from "../../../../../../submodule/genCode-utils/src/utils/array"

export function crudTableAdapter(param){
  const { name,pageName, detailParam } = param
  const  { templateParam } = detailParam
  if(!templateParam || !Object.keys(templateParam)?.length){
    return null
  }
  const { tableCode:tableKey,attrs,tableName } = templateParam
  const primaryKey = camelCase(attrs?.find(item=>!!item.isPrimaryKey)?.prop || 'id')
  const tableCode = pascalCase(tableKey)
  const {queryList,tableList,dialogList} = attrs.reduce((pre,cur)=>{
    cur.prop = camelCase(cur.prop)
    if(!cur.isHidden){
      pre['tableList'].push(cur)
    }
    if(cur.isQuery){
      pre['queryList'].push(cur)
    }
    if(cur.isForm){
      pre['dialogList'].push(cur)
    }
    return pre
  }, { queryList: [], tableList: [], dialogList: [] })


  const enumList = uniqueArray([...queryList, ...tableList, ...dialogList] as [],'prop').filter(item=>item.displayType == 'select').map(item => {
    return {
      prop: item.prop,
      type: item.configParam.type,
      param: item.configParam.param,
      data: item.configParam.data,
      configParam:item.configParam
    }
  })

  const entryEnumList = []
  const queryEnumList = []
  const dialogEnumList = []
  const tableEnumList = []
  enumList.forEach(enumItem => {
    const { prop, type, param, data } = enumItem
    let enumData = enumItem
    if (type == 'interface') {
      enumData = {
        ...enumItem,
        param: {
          tableName:param.tableName,
          pascalCaseProp:pascalCase(prop),
          pascalCaseTableName:pascalCase(param.tableName),
          valueKey:camelCase(param.valueKey),
          labelKey:camelCase(param.labelKey),
        }
      }
      entryEnumList.push(enumData)
      if (queryList.find(e => e.prop == prop)) {
        queryEnumList.push(enumData)
      }
      if (dialogList.find(e => e.prop == prop)) {
        dialogEnumList.push(enumData)
      }
      if (tableList.find(e => e.prop == prop)) {
        tableEnumList.push(enumData)
      }
    }
  });

  const camelCaseName = camelCase(name)

  const query = {
    tableCode,
    list:queryList.map(item=>{
      return {
        ...item,
        formDataCode:'queryForm'
      }
    }),
    enumList:queryEnumList
  }
  const dialog = {
    tableName,
    primaryKey,
    list:dialogList.map(item=>{
      return {
        ...item,
        formDataCode:'formData'
      }
    }),
    enumList:dialogEnumList
  }
  const table = {
    list: tableList,
    enumList:tableEnumList
  }
  const entry = {
    camelCaseName,
    primaryKey,
    tableCode,
    enumList: entryEnumList,
    dialogEnumList,
    tableEnumList,
    queryEnumList
  }
  return {
    name,
    pageName,
    query,
    dialog,
    table,
    entry
  }
}