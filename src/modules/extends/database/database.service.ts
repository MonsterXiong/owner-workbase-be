import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createConnection } from 'typeorm';
import { generatorQueryColumnsSql, generatorQueryDatabaseSql, generatorQueryTableSql } from './utils/sqlTool';

function filterSystemDb(databseData) {
    const filterList = ['sys', 'performance_schema', 'mysql', 'information_schema']
    return databseData.filter(item =>!filterList.includes(item.Database)).map(item=>item.Database)
}

function parseFieldTypeAndLength(fieldDefinition) {
    const matches = fieldDefinition.match(/([a-zA-Z]+)\(([^)]+)\)/);
    if (matches) {
      const type = matches[1];
      let length = matches[2].split(",");
      if(length && length.length>1){
        length = JSON.stringify(length.map((value) => value.replace(/'/g, "")))
      }else{
        length = length[0]
      }
      return { type, length };
    } else {
      return { type: fieldDefinition, length: null };
    }
  }

async function getConnection(params) {
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

@Injectable()
export class DatabaseService {
    async getDbListByConfig(databaseConfig) {
        const connection = await getConnection(databaseConfig);
        const databaseList = filterSystemDb(await connection.query(
            generatorQueryDatabaseSql(),
        ))
        connection.close();
        return databaseList;
    }
    async getTableListByConfig(databaseConfig, database,hasSystem=true) {
      const sql = generatorQueryTableSql(database)
      const connection = await getConnection(databaseConfig);
      const tableList = await querySql(connection, sql);
      if (!tableList?.length) {
        return []
      }
      const result = tableList.map(item => {
        return {
            name:item.TABLE_NAME,
            comment:item.TABLE_COMMENT
        }
      });
      if (hasSystem) {
        return result
      } else {
        return result.filter(item => !item.name.startsWith('s_'))
      }
    }
    async getFieldListByConfig(databaseConfig, database, tableName) {
        const sql = generatorQueryColumnsSql(database, tableName)
        const connection = await getConnection(databaseConfig);
        const fieldList = await querySql(connection,sql);
        return fieldList.map(item=>{
            const {type,length} = parseFieldTypeAndLength(item.Type)
            return {
                ...item,
                _type:type,
                _length:length
            }
        }).filter(item=>!(item.Field.startsWith('sys_') && item.Field!='sys_create_time'))
  }

  async getTableAndFieldByConfig(databaseConfig) {
    const tableList = await this.getTableListByConfig(databaseConfig,databaseConfig.database,false)
    const result = []
    for await (const tableItem of tableList) {
        const fieldList = await this.getFieldListByConfig(databaseConfig,databaseConfig.database, tableItem.name)
        result.push({
            ...tableItem,
            fieldList
        })
    }
    return result
  }
}
