import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository  } from 'typeorm';
import { WfDefTable } from "./wfDefTable.entity";
import { queryParams } from '@/utils/sqlUtil'
import * as xlsx from 'xlsx';
import {Response} from 'express';
import { QueryDto } from '@/common/query.dto';
@Injectable()
export class WfDefTableService {
  constructor(
    @InjectRepository(WfDefTable)
    private repository: Repository<WfDefTable>,
  ) { }

  async findOne(tableId) {
    return await this.repository.findOne({where: { isdel:'0',tableId } });
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

  async getItem(tableId: string) {
    return this.findOne(tableId);
  }

  async importWfDefTable(tableId: string) {
    // return this.repository.findOne( {where:{ tableId }});
  }

  async insert(entity: WfDefTable) {
    const { identifiers } = await this.repository.insert(entity);
    return this.findOne(identifiers[0].tableId)
  }

  async insertBatch(entity: WfDefTable[]) {
    const { identifiers } = await this.repository.createQueryBuilder().insert().values(entity).execute()
    return await this.repository.find({
      where: {
        tableId: In(identifiers.map(item => item.tableId))
      }
    })
  }

  async queryList(params:QueryDto) {
    return queryParams(params, this)
  }
  save(entity: WfDefTable) {
    return this.repository.save(entity);

  }
  saveBatch(entity: WfDefTable[]) {
    return this.repository.save(entity);
  }

  async update(entity: WfDefTable) {
    const existingData = await this.findOne(entity.tableId);
    const mergedWfDefTable = this.repository.merge(existingData, entity);
    this.repository.update(entity.tableId, mergedWfDefTable)
  }

  async updateBatch(entity: WfDefTable[]) {
    for await (const entityItem of entity) {
      this.update(entityItem)
    }
  }
}
