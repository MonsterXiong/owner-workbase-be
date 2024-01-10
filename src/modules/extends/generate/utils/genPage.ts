const ejs = require('ejs');
import * as changeCase from 'change-case';
import { FE_FRAMEWORK_DATA, FE_FRAMEWORK_TYPE } from '../framework';
const path = require('path');
const fs = require('fs/promises');

async function getGenTemp(templateDirPath) {
  const routeConstantTempFile = await fs.readFile(
    `${templateDirPath}/baseRoutesConstant.ejs`,
    'utf8',
  );
  const menuTempFile = await fs.readFile(
    `${templateDirPath}/baseMenuData.ejs`,
    'utf8',
  );
  const pageTempFile = await fs.readFile(
    `${templateDirPath}/basePage.ejs`,
    'utf8',
  );
  const routeTempFile = await fs.readFile(
    `${templateDirPath}/baseRoutes.ejs`,
    'utf8',
  );

  const routeConstantTemp = ejs.compile(routeConstantTempFile);
  const menuTemp = ejs.compile(menuTempFile);
  const pageTemp = ejs.compile(pageTempFile);
  const routeTemp = ejs.compile(routeTempFile);
  return {
    routeConstantTemp,
    menuTemp,
    pageTemp,
    routeTemp,
  };
}

function getFilePath(frameworkType,genType="base"){
  const { pathInfo,projectInfo } = FE_FRAMEWORK_DATA[frameworkType]
  const  {menu,service,route,routeConstant,page} = pathInfo
  const { templateDirPath } = projectInfo

  const menuFilePath = menu[genType]
  const routeConstantFilePath = routeConstant[genType]
  const routeFilePath = route[genType]
  const pageDirPath = page[genType]
  const serviceDirPath = service[genType]
  return {
    routeConstantFilePath,
    menuFilePath,
    routeFilePath,
    pageDirPath,
    serviceDirPath,
    templateDirPath
  }
}

function getTemplateParams(funcList){
  const init_fileList = {
    menuList:[],
    routeList:[],
    routesConstantList:[],
    pageList:[]
  }
  const fileInfo =funcList.reduce((res,item)=>{
    const {code} = item
    const CONST_CODE = changeCase.constantCase(code)
    const CAMEL_CASE_CODE = changeCase.camelCase(code)
    const PASCAL_CASE_CODE = changeCase.pascalCase(code)
    const VUE_FILE_NAME = `${CAMEL_CASE_CODE}/${PASCAL_CASE_CODE}.vue`
    res['menuList'].push({
      ...item,
      menuParams: CONST_CODE,
    })
    if(item.menuType == 'page'){
      res['routesConstantList'].push({
        const: CONST_CODE,
        path: CAMEL_CASE_CODE,
        name: PASCAL_CASE_CODE,
      })
      res['routeList'].push({
        ...item,
        const: CONST_CODE,
        path: `@/pages/${VUE_FILE_NAME}`,
      })
      res['pageList'].push({
        ...item,
        compName: PASCAL_CASE_CODE,
        filePath: VUE_FILE_NAME,
      });
    }
    return res
  },init_fileList)
  return fileInfo
}

async function genPage(funcList) {
  const { routeConstantFilePath, menuFilePath,routeFilePath,pageDirPath,serviceDirPath,templateDirPath } = getFilePath(FE_FRAMEWORK_TYPE.TXSJ)
  const { routeConstantTemp, menuTemp, pageTemp, routeTemp } = await getGenTemp(templateDirPath);
  const { pageList,routesConstantList,routeList,menuList } = getTemplateParams(funcList)
  
  const result = [];

  for (const page of pageList) {
    if (page.code) {
      result.push({
        filePath: path.join(pageDirPath, page.filePath),
        content: pageTemp({ ...page }),
      });
    }
  }

  result.push({
    filePath: routeConstantFilePath,
    content: routeConstantTemp({ list: routesConstantList }),
  });
  result.push({
    filePath: routeFilePath,
    content: routeTemp({ list: routeList }),
  });
  result.push({
    filePath: menuFilePath,
    content: menuTemp({ list: menuList }),
  });

  return result;
}

export default genPage
