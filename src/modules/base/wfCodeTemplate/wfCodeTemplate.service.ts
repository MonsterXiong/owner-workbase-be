import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository  } from 'typeorm';
import { WfCodeTemplate } from "./wfCodeTemplate.entity";
import { queryParams } from '@/utils/sqlUtil'
import * as xlsx from 'xlsx';
import {Response} from 'express';
import { QueryDto } from '@/common/query.dto';
@Injectable()
export class WfCodeTemplateService {
  constructor(
    @InjectRepository(WfCodeTemplate)
    private repository: Repository<WfCodeTemplate>,
  ) { }

  async findOne(codeTemplateId) {
    return await this.repository.findOne({where: { isdel:'0',codeTemplateId } });
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

  async getItem(codeTemplateId: string) {
    return this.findOne(codeTemplateId);
  }

  async importWfCodeTemplate(codeTemplateId: string) {
    // return this.repository.findOne( {where:{ codeTemplateId }});
  }

  async insert(entity: WfCodeTemplate) {
    const { identifiers } = await this.repository.insert(entity);
    return this.findOne(identifiers[0].codeTemplateId)
  }

  async insertBatch(entity: WfCodeTemplate[]) {
    const { identifiers } = await this.repository.createQueryBuilder().insert().values(entity).execute()
    return await this.repository.find({
      where: {
        codeTemplateId: In(identifiers.map(item => item.codeTemplateId))
      }
    })
  }

  async queryList(params:QueryDto) {
    return queryParams(params, this)
  }
  save(entity: WfCodeTemplate) {
    return this.repository.save(entity);

  }
  saveBatch(entity: WfCodeTemplate[]) {
    return this.repository.save(entity);
  }

  async update(entity: WfCodeTemplate) {
    const existingData = await this.findOne(entity.codeTemplateId);
    const mergedWfCodeTemplate = this.repository.merge(existingData, entity);
    this.repository.update(entity.codeTemplateId, mergedWfCodeTemplate)
  }

  async updateBatch(entity: WfCodeTemplate[]) {
    for await (const entityItem of entity) {
      this.update(entityItem)
    }
  }
}
