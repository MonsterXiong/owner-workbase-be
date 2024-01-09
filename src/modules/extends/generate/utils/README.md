// 用于新建一个生成函数,根据内容(模板+数据生成内容) + 文件路径
1. 获取数据
2. 获取模板
3. 获取模板参数
4. 返回结果

```js
const ejs = require('ejs');
import * as changeCase from 'change-case';
import { FE_FRAMEWORK_DATA, FE_FRAMEWORK_TYPE } from '../framework';
const path = require('path');
const fs = require('fs/promises');

const templateDirPath = 'public/template/fe';
async function getGenTemp(templateDirPath) {
  const menuTempFile = await fs.readFile(
    `${templateDirPath}/baseMenuData.ejs`,
    'utf8',
  );

  const menuTemp = ejs.compile(menuTempFile);

  return {
    menuTemp,
  };
}

function getFilePath(frameworkType,genType="base"){
  const { pathInfo } = FE_FRAMEWORK_DATA[frameworkType]
  const  {menu,service,route,routeConstant,page} = pathInfo
  const menuFilePath = menu[genType]

  return {
    menuFilePath,
  }
}

function getTemplateParams(funcList){
  const init_fileList = {
    menuList:[],
  }
  const fileInfo =funcList.reduce((res,item)=>{
    const {code} = item
    const CONST_CODE = changeCase.constantCase(code)

    res['menuList'].push({
      ...item,
      menuParams: CONST_CODE,
    })
    return res
  },init_fileList)
  return fileInfo
}

async function genPage(funcList) {
  const {  menuTemp } = await getGenTemp(templateDirPath);
  const { menuFilePath } = getFilePath(FE_FRAMEWORK_TYPE.TXSJ)
  const { menuList } = getTemplateParams(funcList)
  
  const result = [];

  result.push({
    filePath: menuFilePath,
    content: menuTemp({ list: menuList }),
  });

  return result;
}

export default genPage

```