import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository  } from 'typeorm';
import { WfViewPage } from "./wfViewPage.entity";
import { queryParams } from '@/utils/sqlUtil'
import * as xlsx from 'xlsx';
import {Response} from 'express';
import { QueryDto } from '@/common/query.dto';
@Injectable()
export class WfViewPageService {
  constructor(
    @InjectRepository(WfViewPage)
    private repository: Repository<WfViewPage>,
  ) { }

  async findOne(viewPageId) {
    return await this.repository.findOne({where: { isdel:'0',viewPageId } });
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

  async getItem(viewPageId: string) {
    return this.findOne(viewPageId);
  }

  async importWfViewPage(viewPageId: string) {
    // return this.repository.findOne( {where:{ viewPageId }});
  }

  async insert(entity: WfViewPage) {
    const { identifiers } = await this.repository.insert(entity);
    return this.findOne(identifiers[0].viewPageId)
  }

  async insertBatch(entity: WfViewPage[]) {
    const { identifiers } = await this.repository.createQueryBuilder().insert().values(entity).execute()
    return await this.repository.find({
      where: {
        viewPageId: In(identifiers.map(item => item.viewPageId))
      }
    })
  }

  async queryList(params:QueryDto) {
    return queryParams(params, this)
  }
  save(entity: WfViewPage) {
    return this.repository.save(entity);

  }
  saveBatch(entity: WfViewPage[]) {
    return this.repository.save(entity);
  }

  async update(entity: WfViewPage) {
    const existingData = await this.findOne(entity.viewPageId);
    const mergedWfViewPage = this.repository.merge(existingData, entity);
    this.repository.update(entity.viewPageId, mergedWfViewPage)
  }

  async updateBatch(entity: WfViewPage[]) {
    for await (const entityItem of entity) {
      this.update(entityItem)
    }
  }
}
