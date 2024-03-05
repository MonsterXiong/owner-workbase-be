import {
  Controller,
  Post,
  HttpException,
  HttpStatus,
  Get,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { DatabaseService } from './database.service';
import { createConnection } from 'typeorm';
import {
  generatorQueryColumnsSql,
  generatorQueryDatabaseSql,
  generatorQueryTableSql,
} from './utils/sqlTool';
import { ApiOperation, ApiParam, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';

const databaseConfig:DbDto = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
};

class DbDto{
  @ApiProperty({
    description: '数据库类型',
    required: true,
    default:"mysql"
  })
  type: string

  @ApiProperty({
    description: '主机',
    required: true,
    default:"localhost"
  })
  host: string

  @ApiProperty({
    description: '端口',
    required: true,
    default:3306
  })
  port: number

  @ApiProperty({
    description: '数据库用户名',
    required: true,
    default:'root'
  })
  username: string

  @ApiProperty({
    description: '数据库密码',
    required: true,
    default:'123456'
  })
  password: string
}

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



@ApiTags('database')
@Controller('database')
// 跟db相关的接口
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

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
    return await this.databaseService.getFieldListByConfig(databaseConfig,database,tableName)
  }


  @Post('getDatabaseData')
  async getDatabaseData(@Body() params) {
    const { poolId } = params;
    const connection = await getConnection(params);
    const result = {
      databaseList: [],
      tableList: [],
    };
      const databaseList = filterSystemDb(await connection.query(
        generatorQueryDatabaseSql(),
      )).map((item) => {
        return {
          poolId,
          databaseId: item,
          name: item,
        };
      });
      let tableList = [];
      for (const database of databaseList) {
        const data = await connection.query(
          generatorQueryTableSql(database.name),
        );
        const tableItemResult = data.map((tableItem) => {
          return {
            databaseId: database.name,
            tableId: tableItem.TABLE_NAME,
            name: tableItem.TABLE_NAME,
            comment: tableItem.TABLE_COMMENT,
          };
        });
        tableList = tableList.concat(tableItemResult);
      }
      result.databaseList = databaseList;
      result.tableList = tableList;
      connection.close();
    return result
  }


  @Post('db')
  async getDbListByConfig(@Body() param:DbDto) {
    return await this.databaseService.getDbListByConfig(param)
  }

  @Post('table')
  @ApiQuery({
    name: 'database',
    description: '数据库名',
  })
  async getTableListByConfig(@Body() param: DbDto,@Query('database') database: string) {
    console.log('database',database);
    if (!database) {
        return null
    }


    return await this.databaseService.getTableListByConfig(param,database)
  }

  @Post('field')
  @ApiQuery({
    name: 'database',
    description: '数据库名',
  })
  @ApiQuery({
    name: 'tableName',
    description: '数据库表名',
  })
  async getFieldListByConfig(@Body() param: DbDto,@Query('database') database: string,@Query('tableName') tableName: string) {
    if (!database || !tableName) {
      return null
    }
    return await this.databaseService.getFieldListByConfig(param,database,tableName)
  }
}
