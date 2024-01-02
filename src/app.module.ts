import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { getConfiguration } from './config/configuration';
import * as ModuleList from './base/index';
import { PeopleModule } from './modules/people/people.module';
import { DatabaseModule } from './modules/extends/database/database.module';
import {
  databaseConfig,
  generatorDatabaseConfig,
} from './config/database.config';
import { TestModule } from './modules/extends/test/test.module';
console.log(ModuleList);

@Module({
  imports: [
    ConfigModule.forRoot({
      //配置为全局可见，否则需要在每个模块中单独导入ConfigModule
      isGlobal: true,
      //配置文件路径，也可以配置为数组如['/config/.env1','.env']。
      envFilePath: [`.env.${process.env.NODE_DEV}`, '.env'],
      //忽略配置文件，为true则仅读取操作系统环境变量，常用于生产环境
      ignoreEnvFile: false,
      //导入自定义配置文件
      load: [getConfiguration],
    }),
    TypeOrmModule.forRoot({
      ...generatorDatabaseConfig(databaseConfig, {
        autoLoadEntities: true,
        type: 'mysql',
        synchronize: false,
        dateStrings: true,
        timezone: 'Z',
        entities: [`${__dirname}/src/base/**/*.entity{.ts,.js}`],
      }),
    }),
    PeopleModule,
    DatabaseModule,
    // ...ModuleList,
    TestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
