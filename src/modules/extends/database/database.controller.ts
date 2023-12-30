import {
  Controller,
  Post,
  HttpException,
  HttpStatus,
  Get,
  Param,
} from '@nestjs/common';
import { DatabaseService } from './database.service';
import { createConnection } from 'typeorm';
import {
  generatorQueryColumnsSql,
  generatorQueryDatabaseSql,
  generatorQueryTableSql,
} from './utils/sqlTool';
import { ApiOperation, ApiParam } from '@nestjs/swagger';

const databaseConfig = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
};

function filterSystemDb(databseData) {
  const result = databseData
    .filter(
      (item) =>
        !['sys', 'performance_schema', 'mysql', 'information_schema'].includes(
          item.Database,
        ),
    )
    .map((item) => item.Database);
  return result;
}

async function getConnection(params) {
  // const { type, host, port, username, password } = params;
  try {
    const connction = await createConnection(params);
    if (connction.isConnected) {
      return connction;
    }
  } catch (error) {
    throw new HttpException('连接失败', HttpStatus.CONFLICT);
  }
}

async function querySql(connction, sql) {
  const data = await connction.query(sql);
  connction.close();
  return data;
}

async function getConnect() {
  return await getConnection(databaseConfig);
}

@Controller('database')
// 跟db相关的接口
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Post('db')
  // 接收一个db连接配置=>
  async getDbList() {
    // 根据poolId就可以拿到数据库配置，从而回去数据库的数据
    const connection = await getConnect();
    const databaseList = await querySql(
      connection,
      generatorQueryDatabaseSql(),
    );
    return filterSystemDb(databaseList);
  }

  @Post('table')
  async getTableListByDb(DbName) {
    // 根据pooIId 加上DbName，获取表列表
    const connection = await getConnect();
    const databaseList = await querySql(
      connection,
      generatorQueryTableSql(DbName),
    );
    return filterSystemDb(databaseList);
  }

  //
  @Get(':database/:tableName')
  @ApiOperation({
    summary: '根据数据库名和表名获取字段',
  })
  @ApiParam({
    name: 'database',
    description: '数据库名',
  })
  @ApiParam({
    name: 'tableName',
    description: '数据库表名',
  })
  async findTableDetail(
    @Param('database') database: string,
    @Param('tableName') tableName: string,
  ) {
    // 根据pooIId 加上DbName，获取表名，获取字段数据
    const connection = await getConnect();
    return await querySql(
      connection,
      generatorQueryColumnsSql(database, tableName),
    );
  }

  // 根据项目id直接获取所有数据
}

// @Post()
// async genInterface() {
//   // 数据库进行连接然后生成
//   // 先连接数据库进行获取数据
//   return this.genInterfaceByTable();
// }
// @Post('table')
// async genInterfaceByTable() {
//   // 直接传递数据就生成
// }
// @Post('database')
// async genInterfaceByDb() {}
// }
