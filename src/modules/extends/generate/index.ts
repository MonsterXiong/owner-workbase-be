import { databaseConfig } from '../../../config/database.config';
const fse = require('fs-extra');
const path = require('path');
const fs = require('fs/promises');
const mysql = require('mysql2/promise');
const ejs = require('ejs');
import * as changeCase from "change-case";


const templateDirPath = 'public/template/interface'
// const basePath = path.join(process.cwd(), './src/modules/base')


function convertMySQLTypeToNodeJS(mysqlType) {
  if (mysqlType.includes('varchar') || mysqlType.includes('text') || mysqlType.includes('char')) {
    return 'String';
  } else if (mysqlType.includes('int') || mysqlType.includes('integer') || mysqlType.includes('bigint')) {
    return 'Number';
  } else if (mysqlType.includes('float') || mysqlType.includes('double') || mysqlType.includes('decimal')) {
    return 'Number';
  } else if (mysqlType.includes('date') || mysqlType.includes('time') || mysqlType.includes('timestamp')) {
    return 'Date';
  } else if (mysqlType.includes('bool') || mysqlType.includes('bit')) {
    return 'Boolean';
  } else {
    return null;
  }
}

async function getTableLsit(connection, DATABASE) {
  const [tables] = await connection.query(`SELECT TABLE_NAME,TABLE_COMMENT FROM information_schema.TABLES WHERE table_schema = '${DATABASE}'`,);
  return tables
}

async function getFieldInfoByTable(connection, DATABASE, TABLE_NAME) {
  const [fields] = await connection.query(`SHOW FULL COLUMNS FROM \`${DATABASE}\`.${TABLE_NAME}`)
  return fields
}

async function getTableInfo() {
  const { HOST, USERNAME, PASSWORD, DATABASE } = databaseConfig
  const config = {
    host: HOST,
    user: USERNAME,
    password: PASSWORD,
    database: DATABASE
  }
  const connection = await mysql.createConnection(config);
  const tables = await getTableLsit(connection, DATABASE)
  const result = []


  for await (const table of tables) {
    const { TABLE_NAME, TABLE_COMMENT } = table
    const fields = await getFieldInfoByTable(connection, DATABASE, TABLE_NAME)
    result.push({
      TABLE_NAME,
      TABLE_COMMENT,
      TABLE_FIELDS: fields
    })
  }

  connection.end();
  return result
}

async function getFilePath(tableName, basePath) {
  const TABLE_NAME = changeCase.camelCase(tableName)
  const dirPath = path.join(basePath, TABLE_NAME);
  await fse.ensureDir(dirPath)
  const entityFilePath = path.join(dirPath, `${TABLE_NAME}.entity.ts`)
  const controllerFilePath = path.join(dirPath, `${TABLE_NAME}.controller.ts`)
  const moduleFilePath = path.join(dirPath, `${TABLE_NAME}.module.ts`)
  const serviceFilePath = path.join(dirPath, `${TABLE_NAME}.service.ts`)

  return {
    entityFilePath,
    controllerFilePath,
    moduleFilePath,
    serviceFilePath
  }
}

// 读取模板文件
async function getGenTemp(templateDirPath) {
  const enyityTempFile = await fs.readFile( `${templateDirPath}/entity.ejs`, 'utf8')
  const moduleTempFile = await fs.readFile( `${templateDirPath}/module.ejs`, 'utf8')
  const controllerTempFile = await fs.readFile( `${templateDirPath}/controller.ejs`, 'utf8')
  const serviceTempFile = await fs.readFile( `${templateDirPath}/service.ejs`, 'utf8')

  const enyityTemp = ejs.compile(enyityTempFile);
  const moduleTemp = ejs.compile(moduleTempFile);
  const controllerTemp = ejs.compile(controllerTempFile);
  const serviceTemp = ejs.compile(serviceTempFile);
  return {
    enyityTemp,
    moduleTemp,
    controllerTemp,
    serviceTemp
  }
}

// 生成入口文件
async function genEntryFile(basePath, templateDirPath, tables,result) {
  const indexFilePath = path.join(basePath, `index.ts`)
  const serviceTemp = await fs.readFile(`${templateDirPath}/index.ejs`, 'utf8')
  // 生成一个index.文件
  const data = {
    tables: tables.map(table => {
      return {
        dirName: changeCase.camelCase(table.TABLE_NAME),
        moduleName: changeCase.pascalCase(table.TABLE_NAME),
        TABLE_NAME: changeCase.camelCase(table.TABLE_NAME)
      }
    })
  }
  result.push({
    path:indexFilePath,
    content:ejs.render(serviceTemp, data)
  })
  fs.writeFile(indexFilePath, ejs.render(serviceTemp, data))
}



async function generate(tables,projectInfo,templateDirPath) {
  const { prefix,outputPath:basePath } = projectInfo

  await fse.ensureDir(basePath)
  const { enyityTemp, moduleTemp, controllerTemp, serviceTemp } = await getGenTemp(templateDirPath)
  const result = []
  // 如果存在目录，则删除目录以及目录之下的文件
  for await (const table of tables) {
    const { TABLE_NAME, TABLE_FIELDS, TABLE_COMMENT } = table
    const { entityFilePath, controllerFilePath, moduleFilePath, serviceFilePath } = await getFilePath(TABLE_NAME, basePath)
    const primaryFieldInfo = TABLE_FIELDS.find(item => item.Key == 'PRI')
    if (!primaryFieldInfo) {
      throw new Error('没有找到主键')
    }

    const data = {
      ApiPrefix: prefix,
      tableName: changeCase.camelCase(TABLE_NAME),
      TableName: changeCase.pascalCase(TABLE_NAME),
      tableComment: TABLE_COMMENT,
      primaryKey: changeCase.camelCase(primaryFieldInfo.Field),
    }

    const fields = TABLE_FIELDS.map((item) => {
      const type = convertMySQLTypeToNodeJS(item['Type'])
      return {
        ...item,
        sourceField: item.Field,
        Field: changeCase.camelCase(item.Field),
        Null: item.Null == 'YES',
        Type: type == 'Date' ? type : changeCase.camelCase(type)
      }
    })
    result.push({
      path:entityFilePath,
      content:enyityTemp({ ...data, fields })
    })
    result.push({
      path:controllerFilePath,
      content:controllerTemp(data)
    })
    result.push({
      path:moduleFilePath,
      content:moduleTemp(data)
    })
    result.push({
      path:serviceFilePath,
      content:serviceTemp(data)
    })
    fs.writeFile(entityFilePath, enyityTemp({ ...data, fields }))
    fs.writeFile(controllerFilePath, controllerTemp(data))
    fs.writeFile(moduleFilePath, moduleTemp(data))
    fs.writeFile(serviceFilePath, serviceTemp(data))
  }

  await genEntryFile(basePath, templateDirPath, tables,result)
  return result
}

export async function exec(param){
  const tableInfo = await getTableInfo()
  return await generate(tableInfo,param.projectInfo,templateDirPath)
}