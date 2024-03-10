export function generalTableAdapter(param){
  // tip:暂时使用的是crudTableAdapter
  const { name,pageName, detailParam } = param
  const  { templateParam } = detailParam
  // if(!templateParam || !Object.keys(templateParam)?.length){
  //   return null
  // }
  return param
}