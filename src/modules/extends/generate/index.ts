import { databaseConfig } from '../../../config/database.config';
const fse = require('fs-extra');
const path = require('path');
const fs = require('fs/promises');
// const fs = require('fs');
// const mysql = require('mysql2');
const mysql = require('mysql2/promise');
const ejs = require('ejs');
import * as changeCase from "change-case";

// 以下将会注释
const { HOST, USERNAME, PASSWORD, DATABASE } = databaseConfig
// 创建一个数据库连接

const config = {
  host: HOST,
  user: USERNAME,
  password: PASSWORD,
  database: DATABASE
}


!(async () => {
  const connection = await mysql.createConnection(config);
  const [tables] = await connection.query(`SELECT TABLE_NAME,TABLE_COMMENT FROM information_schema.TABLES WHERE table_schema = '${DATABASE}'`,);
  const result = []
  for await (const table of tables) {
    const { TABLE_NAME, TABLE_COMMENT } = table
    const [fields] = await connection.query(`SHOW FULL COLUMNS FROM \`${DATABASE}\`.${TABLE_NAME}`)
    result.push({
      TABLE_NAME,
      TABLE_COMMENT,
      TABLE_FIELDS: fields
    })
  }
  console.log(result);
  generate(result)
  connection.end();
  // await generate(result)
})()


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
  const enyityTempFile = await fs.readFile(path.join(__dirname, `${templateDirPath}/entity.ejs`), 'utf8')
  const moduleTempFile = await fs.readFile(path.join(__dirname, `${templateDirPath}/module.ejs`), 'utf8')
  const controllerTempFile = await fs.readFile(path.join(__dirname, `${templateDirPath}/controller.ejs`), 'utf8')
  const serviceTempFile =  await fs.readFile(path.join(__dirname, `${templateDirPath}/service.ejs`), 'utf8')

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
async function genEntryFile(basePath,templateDirPath,tables){
    const indexFilePath = path.join(basePath, `index.ts`)
    const serviceTemp = await fs.readFile(path.join(__dirname,`${templateDirPath}/index.ejs`), 'utf8')
    // 生成一个index.文件
    const data = {
      tables:tables.map(table=>{
        return {
          dirName:changeCase.camelCase(table.TABLE_NAME),
          moduleName:changeCase.pascalCase(table.TABLE_NAME),
          TABLE_NAME:changeCase.camelCase(table.TABLE_NAME)
        }
      })
    }
    fs.writeFile(indexFilePath, ejs.render(serviceTemp,data))
}

async function generate(tables) {

  const templateDirPath =  './templates/interface'
  //
  // const basePath = path.join(__dirname, '../base');
  const basePath = path.join(process.cwd(), './src/base');
  await fse.emptyDir(basePath)

  const { enyityTemp, moduleTemp, controllerTemp, serviceTemp } = await getGenTemp(templateDirPath)

  // 如果存在目录，则删除目录以及目录之下的文件
  for await (const table of tables) {
    const { TABLE_NAME, TABLE_FIELDS, TABLE_COMMENT } = table
    const { entityFilePath, controllerFilePath, moduleFilePath, serviceFilePath } = await getFilePath(TABLE_NAME, basePath)

    const data = {
      TABLE_NAME: changeCase.camelCase(TABLE_NAME),
      TABLE_COMMENT,
      dirName: changeCase.camelCase(TABLE_NAME),
      name: changeCase.pascalCase(TABLE_NAME)
    }

    const fields = TABLE_FIELDS.map((item) => {
      return {
        ...item,
        Null: item.Null == 'YES',
        Type: convertMySQLTypeToNodeJS(item['Type'])
      }
    })
    fs.writeFile(entityFilePath, enyityTemp({ ...data, fields }))
    fs.writeFile(controllerFilePath, controllerTemp(data))
    fs.writeFile(moduleFilePath, moduleTemp(data))
    fs.writeFile(serviceFilePath, serviceTemp({ ...data, fields }))
  }

  genEntryFile(basePath,templateDirPath,tables)

}


// 大驼峰命名
function toPascalCase(name) {
  const words = name.split(/[\s_-]+/); // 根据空格、连字符和下划线拆分为单词数组
  const pascalCaseWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)); // 将每个单词的首字母大写
  return pascalCaseWords.join(''); // 连接所有单词
}


// 小驼峰命名
function toCamelCase(name) {
  const words = name.split(/[\s_-]+/); // 根据空格、连字符和下划线拆分为单词数组
  const camelCaseWords = words.map((word, index) => {
    if (index === 0) {
      return word.toLowerCase(); // 第一个单词保持小写
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1); // 后续单词的首字母大写
    }
  });
  return camelCaseWords.join(''); // 连接所有单词
}


// mysql数据类型转为为nodejs的数据类型
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