import * as changeCase from "change-case";
import { getTableInfo } from "./common";
import { FE_FRAMEWORK_DATA, FE_FRAMEWORK_TYPE } from "../framework";
const ejs = require('ejs');
const path = require('path');
const fs = require('fs/promises');

async function getGenTemp(templateDirPath){
    const serviceTempFile = await fs.readFile(
        `${templateDirPath}/baseService.ejs`,
        'utf8',
      );

      const serviceTemp = ejs.compile(serviceTempFile);

      return {
        serviceTemp
      };
}

function getFilePath(frameworkType,genType="base"){
    const { pathInfo,projectInfo } = FE_FRAMEWORK_DATA[frameworkType]
    const { service } = pathInfo
    const { templateDirPath } = projectInfo
    const serviceDirPath = service[genType]
    return {
      serviceDirPath,
      templateDirPath
    }
}

function getTemplateParams(tableInfo,prefix){
    const tableList = tableInfo.filter(item=>!item.TABLE_NAME.startsWith('s_')).map(item=>{
        const tableName = item.TABLE_NAME
        const prikeyItem = item.TABLE_FIELDS.find(field=>field.Key=='PRI')
        return {
            tableName:changeCase.camelCase(tableName),
            TableName:changeCase.pascalCase(tableName),
            tableCommon: item.TABLE_COMMENT,
            basePrefix:prefix,
            prikey:prikeyItem?changeCase.camelCase(prikeyItem.Field):'id',
        }
    })
    return tableList
}

async function genServiceFe(param){
    const { prefix } =  param
    // 获取table
    const tableInfo = await getTableInfo()
    const { serviceDirPath,templateDirPath } = getFilePath(FE_FRAMEWORK_TYPE.TXSJ)
    const { serviceTemp } = await getGenTemp(templateDirPath);
    const serviceList =getTemplateParams(tableInfo,prefix)
    let result = []
    for await (const service of serviceList) {
          result.push({
            filePath: path.join(serviceDirPath, `${service.tableName}Service.js`),
            content: serviceTemp({ ...service }),
          });
      }
    return result
}

export default genServiceFe