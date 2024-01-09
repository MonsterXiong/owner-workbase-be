import { BE_FRAMEWORK_DATA, BE_FRAMEWORK_TYPE } from './../framework';
const fse = require('fs-extra');
const path = require('path');
const fs = require('fs/promises');
const ejs = require('ejs');
import * as changeCase from 'change-case';
import { convertMySQLTypeToNodeJS, getTableInfo } from './common';

async function getFilePath(tableName, basePath) {
  const TABLE_NAME = changeCase.camelCase(tableName);
  const dirPath = path.join(basePath, TABLE_NAME);
  await fse.ensureDir(dirPath);
  const entityFilePath = path.join(dirPath, `${TABLE_NAME}.entity.ts`);
  const controllerFilePath = path.join(dirPath, `${TABLE_NAME}.controller.ts`);
  const moduleFilePath = path.join(dirPath, `${TABLE_NAME}.module.ts`);
  const serviceFilePath = path.join(dirPath, `${TABLE_NAME}.service.ts`);

  return {
    entityFilePath,
    controllerFilePath,
    moduleFilePath,
    serviceFilePath,
  };
}

// 读取模板文件
async function getGenTemp(templateDirPath) {
  const enyityTempFile = await fs.readFile(
    `${templateDirPath}/entity.ejs`,
    'utf8',
  );
  const moduleTempFile = await fs.readFile(
    `${templateDirPath}/module.ejs`,
    'utf8',
  );
  const controllerTempFile = await fs.readFile(
    `${templateDirPath}/controller.ejs`,
    'utf8',
  );
  const serviceTempFile = await fs.readFile(
    `${templateDirPath}/service.ejs`,
    'utf8',
  );

  const enyityTemp = ejs.compile(enyityTempFile);
  const moduleTemp = ejs.compile(moduleTempFile);
  const controllerTemp = ejs.compile(controllerTempFile);
  const serviceTemp = ejs.compile(serviceTempFile);
  return {
    enyityTemp,
    moduleTemp,
    controllerTemp,
    serviceTemp,
  };
}

// 生成入口文件
async function genEntryFile(basePath, templateDirPath, tables, result) {
  const indexFilePath = path.join(basePath, `index.ts`);
  const serviceTemp = await fs.readFile(`${templateDirPath}/index.ejs`, 'utf8');
  // 生成一个index.文件
  const data = {
    tables: tables.map((table) => {
      return {
        dirName: changeCase.camelCase(table.TABLE_NAME),
        moduleName: changeCase.pascalCase(table.TABLE_NAME),
        TABLE_NAME: changeCase.camelCase(table.TABLE_NAME),
      };
    }),
  };
  result.push({
    filePath: indexFilePath,
    content: ejs.render(serviceTemp, data),
  });
}

// 生成代码
async function generate(tables, projectParams) {
  const { prefix, outputPath } = projectParams;
  const {pathInfo,projectInfo}=BE_FRAMEWORK_DATA[BE_FRAMEWORK_TYPE.NEST]
  const {templateDirPath }= projectInfo
  const {module} = pathInfo
  const modulePath = module['base']
  const basePath = path.join(outputPath,modulePath)
  await fse.ensureDir(basePath);
  const { enyityTemp, moduleTemp, controllerTemp, serviceTemp } =
  await getGenTemp(templateDirPath);
  const result = [];
  // 如果存在目录，则删除目录以及目录之下的文件
  for await (const table of tables) {
    const { TABLE_NAME, TABLE_FIELDS, TABLE_COMMENT } = table;
    const {
      entityFilePath,
      controllerFilePath,
      moduleFilePath,
      serviceFilePath,
    } = await getFilePath(TABLE_NAME, basePath);
    const primaryFieldInfo = TABLE_FIELDS.find((item) => item.Key == 'PRI');
    if (!primaryFieldInfo) {
      throw new Error('没有找到主键');
    }

    const data = {
      ApiPrefix: prefix,
      tableName: changeCase.camelCase(TABLE_NAME),
      TableName: changeCase.pascalCase(TABLE_NAME),
      tableComment: TABLE_COMMENT,
      primaryKey: changeCase.camelCase(primaryFieldInfo.Field),
    };

    const fields = TABLE_FIELDS.map((item) => {
      const type = convertMySQLTypeToNodeJS(item['Type']);
      return {
        ...item,
        sourceField: item.Field,
        Field: changeCase.camelCase(item.Field),
        Null: item.Null == 'YES',
        Type: type == 'Date' ? type : changeCase.camelCase(type),
      };
    });
    result.push({
      filePath: entityFilePath,
      content: enyityTemp({ ...data, fields }),
    });
    result.push({
      filePath: controllerFilePath,
      content: controllerTemp(data),
    });
    result.push({
      filePath: moduleFilePath,
      content: moduleTemp(data),
    });
    result.push({
      filePath: serviceFilePath,
      content: serviceTemp(data),
    });
  }

  await genEntryFile(basePath, templateDirPath, tables, result);
  return result;
}

async function genInterface(param) {
  const tableInfo = await getTableInfo();
  return await generate(tableInfo, param.projectInfo);
}

export default genInterface;
