import { camelCase, pascalCase } from "change-case"

export function crudTableAdapter(param){
  const { name,pageName, detailParam } = param
  const  { templateParam } = detailParam
  if(!templateParam || !Object.keys(templateParam)?.length){
    return null
  }
  const { tableCode:tableKey,attrs,tableName } = templateParam
  const primaryKey = camelCase(attrs?.find(item=>!!item.isPrimaryKey)?.prop || 'id')
  const tableCode = pascalCase(tableKey)
  const {queryList,tableList,formList} = attrs.reduce((pre,cur)=>{
    cur.prop = camelCase(cur.prop)
    if(!cur.isHidden){
      pre['tableList'].push(cur)
    }
    if(cur.isQuery){
      pre['queryList'].push(cur)
    }
    if(cur.isForm){
      pre['formList'].push(cur)
    }
    return pre
  },{queryList:[],tableList:[],formList:[]})
  const camelCaseName = camelCase(name)

  const query = {
    tableCode,
    list:queryList.map(item=>{
      return {
        ...item,
        formDataCode:'queryForm'
      }
    })
  }
  const dialog = {
    tableName,
    list:formList.map(item=>{
      return {
        ...item,
        formDataCode:'formData'
      }
    })
  }
  const table = {
    list:tableList
  }
  const entry = {
    camelCaseName,
    primaryKey,
    tableCode
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