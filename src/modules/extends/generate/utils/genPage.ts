const ejs = require("ejs");
import * as changeCase from "change-case";
const path = require('path');
const fse = require('fs-extra');
const templateDirPath = 'public/template/fe'
const fs = require('fs/promises');

async function getGenTemp(templateDirPath){
    const routeConstantTempFile = await fs.readFile( `${templateDirPath}/baseRoutesConstant.ejs`, 'utf8')
    const menuTempFile = await fs.readFile( `${templateDirPath}/baseMenuData.ejs`, 'utf8')
    const pageTempFile = await fs.readFile( `${templateDirPath}/basePage.ejs`, 'utf8')
    const routeTempFile = await fs.readFile( `${templateDirPath}/baseRoutes.ejs`, 'utf8')

    const  routeConstantTemp = ejs.compile(routeConstantTempFile);
    const menuTemp = ejs.compile(menuTempFile);
    const pageTemp = ejs.compile(pageTempFile);
    const routeTemp = ejs.compile(routeTempFile);
    return {
      routeConstantTemp,
      menuTemp,
      pageTemp,
      routeTemp
    }
}
export async  function genPage(funcList){

  
      const menuList = funcList.map(item=>{
        return {
          ...item,
          menuParams:changeCase.constantCase(item.code),
        }
      })

      const needMenuList = funcList.filter(item=>item.menuType=='page')
  
      const routesConstantList = needMenuList.map(item=>{
        return {
          const:changeCase.constantCase(item.code),
          path:changeCase.camelCase(item.code),
          name:changeCase.pascalCase(item.code),
        }
      })

      const pageList = needMenuList.map(item=>{
        return {
            code:item.code,
            compName:changeCase.pascalCase(item.code),
            title:item.name,
            path:`${changeCase.camelCase(item.code)}/${changeCase.pascalCase(item.code)}.vue`
        }
      })
  
      const routeList = needMenuList.map(item=>{
        return {
          const:changeCase.constantCase(item.code),
          path:`@/pages/${changeCase.camelCase(item.code)}/${changeCase.pascalCase(item.code)}.vue`,
          name:item.name
        }
      })

      const {  routeConstantTemp,menuTemp,pageTemp,routeTemp } = await getGenTemp(templateDirPath)
      
      const dirPath = 'src'
      const routeConstantFilePath = path.join(dirPath, `./router/base/baseRoutesConstant.js`)
      const routeFilePath = path.join(dirPath, `./router/base/baseRoutes.js`)
      const menuFilePath = path.join(dirPath,  `./layout/sideBar/menuData.js`)
      const pageDirPath = path.join(dirPath,  `./pages/`)
      
      const result = []

      for await (const page of pageList){
        if(page.code){
            result.push({
                filePath:path.join(pageDirPath,page.path),
                content:pageTemp({...page})
            })
        }
      }

      result.push({
        filePath:routeConstantFilePath,
        content:routeConstantTemp({list:routesConstantList})
      })
      result.push({
        filePath:routeFilePath,
        content:routeTemp({list:routeList})
      })
      result.push({
        filePath:menuFilePath,
        content:menuTemp({list:menuList})
      })

      return result

}