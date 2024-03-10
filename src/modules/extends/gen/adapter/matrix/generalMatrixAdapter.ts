export function generalMatrixAdapter(param){
  // tip:需要在index.ts修改以下适配器引用=>当前使用的是关系矩阵的适配器
  const { name,pageName, detailParam } = param
  const  { templateParam } = detailParam
  // if(!templateParam || !Object.keys(templateParam)?.length){
  //   return null
  // }
  return param
}