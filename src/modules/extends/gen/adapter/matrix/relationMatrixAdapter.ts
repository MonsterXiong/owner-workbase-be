import { camelCase, pascalCase } from "change-case"

function formatTemplateParam(templateParam){
  const {tableCode,fieldList} = templateParam
  const filedInfo = {}
  Object.keys(fieldList).forEach(key=>{
    filedInfo[key] = camelCase(fieldList[key])
  })
  return {
    tableCode:pascalCase(tableCode),
    fieldList:filedInfo
  }
}

export function relationMatrixAdapter(param){
  const { name,pageName, detailParam } = param
  const  { templateParam } = detailParam
  if(!templateParam || !Object.keys(templateParam)?.length){
    return null
  }
  const { horizontal, vertical, rel } = templateParam

  return {
    name,
    pageName,
    entry:{
      horizontal:formatTemplateParam(horizontal),
      vertical:formatTemplateParam(vertical),
      rel:formatTemplateParam(rel)
    }
  }
}