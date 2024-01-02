import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig = {
  // NAME: 'default',
  DATA_TYPE: 'mysql',
  HOST: 'localhost',
  PORT: 3306,
  USERNAME: 'root',
  PASSWORD: '123456',
  DATABASE: 'workflow_db',
};

export function generatorDatabaseConfig(
  config,
  options = {},
): TypeOrmModuleOptions {
  return {
    name: config.NAME,
    type: config.DATA_TYPE,
    host: config.HOST,
    port: config.PORT,
    username: config.USERNAME,
    password: config.PASSWORD,
    database: config.DATABASE,
    ...options,
  };
}
