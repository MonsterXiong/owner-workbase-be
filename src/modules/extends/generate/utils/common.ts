const mysql = require('mysql2/promise');
import { databaseConfig } from '../../../../config/database.config';
const fse = require('fs-extra');
export async function getConnection() {
  const { HOST, USERNAME, PASSWORD, DATABASE } = databaseConfig;
  const config = {
    host: HOST,
    user: USERNAME,
    password: PASSWORD,
    database: DATABASE,
  };
  return await mysql.createConnection(config);
}

export function convertMySQLTypeToNodeJS(mysqlType) {
  if (
    mysqlType.includes('varchar') ||
    mysqlType.includes('text') ||
    mysqlType.includes('char')
  ) {
    return 'String';
  } else if (
    mysqlType.includes('int') ||
    mysqlType.includes('integer') ||
    mysqlType.includes('bigint')
  ) {
    return 'Number';
  } else if (
    mysqlType.includes('float') ||
    mysqlType.includes('double') ||
    mysqlType.includes('decimal')
  ) {
    return 'Number';
  } else if (
    mysqlType.includes('date') ||
    mysqlType.includes('time') ||
    mysqlType.includes('timestamp')
  ) {
    return 'Date';
  } else if (mysqlType.includes('bool') || mysqlType.includes('bit')) {
    return 'Boolean';
  } else {
    return null;
  }
}

export async function getTableLsit(connection, DATABASE) {
  const [tables] = await connection.query(
    `SELECT TABLE_NAME,TABLE_COMMENT FROM information_schema.TABLES WHERE table_schema = '${DATABASE}'`,
  );
  return tables;
}

export async function getFieldInfoByTable(connection, DATABASE, TABLE_NAME) {
  const [fields] = await connection.query(
    `SHOW FULL COLUMNS FROM \`${DATABASE}\`.${TABLE_NAME}`,
  );
  return fields;
}

export async function getTableInfo() {
  const { DATABASE } = databaseConfig;

  const connection = await getConnection();
  const tables = await getTableLsit(connection, DATABASE);
  const result = [];

  for await (const table of tables) {
    const { TABLE_NAME, TABLE_COMMENT } = table;
    const fields = await getFieldInfoByTable(connection, DATABASE, TABLE_NAME);
    result.push({
      TABLE_NAME,
      TABLE_COMMENT,
      TABLE_FIELDS: fields,
    });
  }

  connection.end();
  return result;
}

export async function genCode(result) {
  for (const writeItem of result) {
    const writeFilePath = writeItem.filePath;
    fse.ensureFileSync(writeFilePath);
    fse.writeFile(writeFilePath, writeItem.content);
  }
}
