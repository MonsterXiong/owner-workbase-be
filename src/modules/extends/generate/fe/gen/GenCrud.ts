const BaseGen = require('./BaseGen')
import * as changeCase from "change-case";
const path = require("path");
import  { GEN_CRUD_TYPE }  from '../constants'


class GenCrud extends BaseGen {
  constructor(type, codeType) {
    super(type, codeType)
  }
  implTemplateParams(params) {
    const { tableName, tableCommon, prikey, fields } = params
    const TableName = changeCase.pascalCase(tableName);
    return {
      [GEN_CRUD_TYPE.INDEX]: {
        tableName,
        TableName,
        tableCommon,
      },
      [GEN_CRUD_TYPE.DIALOG]: {
        TableName,
        prikey,
        fields: [
          ...fields.filter(item => item.config.isDialog)
        ],
      },
      [GEN_CRUD_TYPE.QUERY]: {
        fields: [
          ...fields.filter(item => item.config.isQuery)
        ],
      },
      [GEN_CRUD_TYPE.TABLE]: {
        config: {
          selection: {
            show: false,
            label: '序号',
            option: {
              width: 80
            }
          }
        },
        fields: [
          ...fields.filter(item => item.config.isTable)
        ],
      }

    }
  }
  genWriteFilePath(item, params) {
    const tableName = params.tableName
    const basePath = path.join(item.baseDirPath, tableName, item.relativeDirPath)
    const TableName = changeCase.pascalCase(tableName)
    if (item.type == GEN_CRUD_TYPE.INDEX) {
      return path.join(basePath, `./${TableName}Manage.vue`)
    } else {
      return path.join(basePath, `./${TableName}${changeCase.pascalCase(item.type)}.vue`)
    }
  }
}





//  type必须跟ejs前缀相同
async function main() {
  // 第一步 检查是否实现了getTemplateParams方法
  // 第二步 获取对应的模板文件的路径
  // 第三步 根据模板文件路径解析出目录路径以及解析获取type类型文件

  // 外部实现模板对应的参数映射，根据传入的参数获取每个的type应该传入对应的模板参数内容


  // 这样就可以通过type获取到模板内容了
  //  getTemplateParams就是通过 params即可拿到对应的写入路径和写入内容，params应该满足什么格式
}


export default GenCrud
