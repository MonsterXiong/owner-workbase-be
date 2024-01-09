const BaseGen = require('./BaseGen')
import * as changeCase from "change-case";
const path = require("path");
const { GEN_SERVICE_TYPE } = require('../constants')


class GenService extends BaseGen {
  constructor(type, codeType) {
    super(type, codeType)
  }
  implTemplateParams(params) {
    const { tableName, tableCommon, basePrefix,prikey} = params
    const TableName = changeCase.pascalCase(tableName);
    return {
      [GEN_SERVICE_TYPE.BASE]: {
        tableName,
        TableName,
        tableCommon,
        prikey,
        basePrefix,
      },
    }
  }
  genWriteFilePath(item, params) {
    const tableName = params.tableName
    const basePath = path.join(item.baseDirPath, item.type)
    return path.join(basePath, `./${tableName}Service.js`)
  }
}


export default GenService
