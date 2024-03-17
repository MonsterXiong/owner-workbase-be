export function generalTableAdapter(param){
  // tip:暂时使用的是crudTableAdapter
  const { name,pageName, detailParam } = param
  const  { templateParam } = detailParam
  console.log('templateParam',templateParam);
  const { pageConfig } =  templateParam
  const { isQuery, isForm } = pageConfig
  console.log(isQuery,'isQuery ');

  // if(!templateParam || !Object.keys(templateParam)?.length){
  //   return null
  // }
  return param
}