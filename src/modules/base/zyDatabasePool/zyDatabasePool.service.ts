import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository  } from 'typeorm';
import { ZyDatabasePool } from "./zyDatabasePool.entity";
import { queryParams } from '@/utils/sqlUtil'
import * as xlsx from 'xlsx';
import {Response} from 'express';
import { QueryDto } from '@/common/query.dto';
@Injectable()
export class ZyDatabasePoolService {
  constructor(
    @InjectRepository(ZyDatabasePool)
    private repository: Repository<ZyDatabasePool>,
  ) { }

  async findOne(databaseId) {
    return await this.repository.findOne({where: { isdel:'0',databaseId } });
  }

  async findAll(){
    return (await this.repository.find()).filter(item=>item.isdel=='0')
  }

  async deleteBatch(ids: string[]): Promise<void> {
    const dataList = await this.repository.findByIds(ids)
    const delList = dataList.map(item=>{
      return {
        ...item,
        isdel:null
      }
    })
    return await this.updateBatch(delList)
  }

  async exportExcel(data:any[],res: Response,fileName:string) {
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const buffer = xlsx.write(workbook, {
      type: 'buffer',
      bookType: 'xlsx',
    });
    res.set({
      'Content-Disposition': `attachment; filename=${fileName}`,
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
   res.send(Buffer.from(buffer))
  }

  async getItem(databaseId: string) {
    return this.findOne(databaseId);
  }

  async importZyDatabasePool(databaseId: string) {
    // return this.repository.findOne( {where:{ databaseId }});
  }

  async insert(entity: ZyDatabasePool) {
    const { identifiers } = await this.repository.insert(entity);
    return this.findOne(identifiers[0].databaseId)
  }

  async insertBatch(entity: ZyDatabasePool[]) {
    const { identifiers } = await this.repository.createQueryBuilder().insert().values(entity).execute()
    return await this.repository.find({
      where: {
        databaseId: In(identifiers.map(item => item.databaseId))
      }
    })
  }

  async queryList(params:QueryDto) {
    return queryParams(params, this)
  }
  save(entity: ZyDatabasePool) {
    return this.repository.save(entity);

  }
  saveBatch(entity: ZyDatabasePool[]) {
    return this.repository.save(entity);
  }

  async update(entity: ZyDatabasePool) {
    const existingData = await this.findOne(entity.databaseId);
    const mergedZyDatabasePool = this.repository.merge(existingData, entity);
    this.repository.update(entity.databaseId, mergedZyDatabasePool)
  }

  async updateBatch(entity: ZyDatabasePool[]) {
    for await (const entityItem of entity) {
      this.update(entityItem)
    }
  }
}
