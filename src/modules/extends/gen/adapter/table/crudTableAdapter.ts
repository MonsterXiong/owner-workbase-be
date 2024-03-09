import { camelCase } from "change-case"

export function crudTableAdapter(param){
  const { name,pageName, detailParam } = param
  const  { templateParam } = detailParam

  const { tableCode,attrs,tableName } = templateParam
  const primaryKey = attrs.find(item=>!!item.isPrimaryKey)?.prop || 'id'


  const {queryList,tableList,formList} = attrs.reduce((pre,cur)=>{
    if(cur.isHidden){
      pre['tableList'].push(cur)
    }
    if(cur.isQuery){
      pre['queryList'].push(cur)
    }
    if(cur.isForm){
      pre['formList'].push(cur)
    }
    return pre
  },{
    queryList:[],
    tableList:[],
    formList:[]})
  // const queryList = attrs.filter(item=>item=>item.isQuery)
  // const tableList = attrs.filter(item=>item=>item.isQuery)
  const camelCaseName = camelCase(name)
  console.log(attrs);

  // 开始清洗数据
  // query的数据有哪些
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