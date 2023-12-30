// 查询数据库
export const generatorQueryDatabaseSql = () => {
  return `SHOW DATABASES;`;
};

// 查询数据库的表结构
export const generatorQueryTableSql = (DATABASE: string): any => {
  return `SELECT TABLE_NAME,TABLE_COMMENT FROM information_schema.TABLES WHERE table_schema = '${DATABASE}'`;
  // return `SELECT TABLE_NAME,TABLE_COMMENT FROM information_schema.TABLES WHERE table_schema in ('owner-server','test','user-center','zn')`;
};

// 查询表的字段
export const generatorQueryColumnsSql = (
  DATABASE: string,
  TABLE_NAME: string,
) => {
  return `SHOW FULL COLUMNS FROM \`${DATABASE}\`.${TABLE_NAME}`;
};
