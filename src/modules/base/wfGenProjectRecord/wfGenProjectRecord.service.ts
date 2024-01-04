import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository  } from 'typeorm';
import { WfGenProjectRecord } from "./wfGenProjectRecord.entity";
import { queryParams } from '@/utils/sqlUtil'
import * as xlsx from 'xlsx';
import {Response} from 'express';
import { QueryDto } from '@/common/query.dto';
@Injectable()
export class WfGenProjectRecordService {
  constructor(
    @InjectRepository(WfGenProjectRecord)
    private repository: Repository<WfGenProjectRecord>,
  ) { }

  async findOne(genProjectRecordId) {
    return await this.repository.findOne({where: { isdel:'0',genProjectRecordId } });
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

  async getItem(genProjectRecordId: string) {
    return this.findOne(genProjectRecordId);
  }

  async importWfGenProjectRecord(genProjectRecordId: string) {
    // return this.repository.findOne( {where:{ genProjectRecordId }});
  }

  async insert(entity: WfGenProjectRecord) {
    const { identifiers } = await this.repository.insert(entity);
    return this.findOne(identifiers[0].genProjectRecordId)
  }

  async insertBatch(entity: WfGenProjectRecord[]) {
    const { identifiers } = await this.repository.createQueryBuilder().insert().values(entity).execute()
    return await this.repository.find({
      where: {
        genProjectRecordId: In(identifiers.map(item => item.genProjectRecordId))
      }
    })
  }

  async queryList(params:QueryDto) {
    return queryParams(params, this)
  }
  save(entity: WfGenProjectRecord) {
    return this.repository.save(entity);

  }
  saveBatch(entity: WfGenProjectRecord[]) {
    return this.repository.save(entity);
  }

  async update(entity: WfGenProjectRecord) {
    const existingData = await this.findOne(entity.genProjectRecordId);
    const mergedWfGenProjectRecord = this.repository.merge(existingData, entity);
    this.repository.update(entity.genProjectRecordId, mergedWfGenProjectRecord)
  }

  async updateBatch(entity: WfGenProjectRecord[]) {
    for await (const entityItem of entity) {
      this.update(entityItem)
    }
  }
}
