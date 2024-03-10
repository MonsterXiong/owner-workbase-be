import { camelCase, pascalCase } from "change-case"

export function mergeTableAdapter(param){
  const { name,pageName, detailParam } = param
  const  { templateParam } = detailParam
  if(!templateParam || !Object.keys(templateParam)?.length){
    return null
  }
  const { tableCode:tableKey,attrs,tableName } = templateParam
  const primaryKey = attrs?.find(item=>!!item.isPrimaryKey)?.prop || 'id'
  const tableCode = pascalCase(tableKey)
  const {tableList} = attrs.reduce((pre,cur)=>{
    cur.prop = camelCase(cur.prop)
    if(!cur.isHidden){
      pre['tableList'].push(cur)
    }
    return pre
  },{tableList:[]})

  const entry = {
    list:tableList,
    tableCode
  }

  return {
    name,
    pageName,
    entry
  }
}