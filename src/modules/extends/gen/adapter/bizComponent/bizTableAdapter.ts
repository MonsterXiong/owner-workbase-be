export function bizTableAdapter(param){
  const { name,pageName, detailParam, title } = param
  const { templateParam } = detailParam
  console.log('param',param);

  // if(!templateParam || !Object.keys(templateParam)?.length){
  //   return null
  // }
  return param
}