import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository  } from 'typeorm';
import { WfDefTableColumn } from "./wfDefTableColumn.entity";
import { queryParams } from '@/utils/sqlUtil'
import * as xlsx from 'xlsx';
import {Response} from 'express';
import { QueryDto } from '@/common/query.dto';
@Injectable()
export class WfDefTableColumnService {
  constructor(
    @InjectRepository(WfDefTableColumn)
    private repository: Repository<WfDefTableColumn>,
  ) { }

  async findOne(tableColumnId) {
    return await this.repository.findOne({where: { isdel:'0',tableColumnId } });
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

  async getItem(tableColumnId: string) {
    return this.findOne(tableColumnId);
  }

  async importWfDefTableColumn(tableColumnId: string) {
    // return this.repository.findOne( {where:{ tableColumnId }});
  }

  async insert(entity: WfDefTableColumn) {
    const { identifiers } = await this.repository.insert(entity);
    return this.findOne(identifiers[0].tableColumnId)
  }

  async insertBatch(entity: WfDefTableColumn[]) {
    const { identifiers } = await this.repository.createQueryBuilder().insert().values(entity).execute()
    return await this.repository.find({
      where: {
        tableColumnId: In(identifiers.map(item => item.tableColumnId))
      }
    })
  }

  async queryList(params:QueryDto) {
    return queryParams(params, this)
  }
  save(entity: WfDefTableColumn) {
    return this.repository.save(entity);

  }
  saveBatch(entity: WfDefTableColumn[]) {
    return this.repository.save(entity);
  }

  async update(entity: WfDefTableColumn) {
    const existingData = await this.findOne(entity.tableColumnId);
    const mergedWfDefTableColumn = this.repository.merge(existingData, entity);
    this.repository.update(entity.tableColumnId, mergedWfDefTableColumn)
  }

  async updateBatch(entity: WfDefTableColumn[]) {
    for await (const entityItem of entity) {
      this.update(entityItem)
    }
  }
}
