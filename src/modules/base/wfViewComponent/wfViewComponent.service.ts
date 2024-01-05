import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository  } from 'typeorm';
import { WfViewComponent } from "./wfViewComponent.entity";
import { queryParams } from '@/utils/sqlUtil'
import * as xlsx from 'xlsx';
import {Response} from 'express';
import { QueryDto } from '@/common/query.dto';
@Injectable()
export class WfViewComponentService {
  constructor(
    @InjectRepository(WfViewComponent)
    private repository: Repository<WfViewComponent>,
  ) { }

  async findOne(viewViewComponentId) {
    return await this.repository.findOne({where: { isdel:'0',viewViewComponentId } });
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

  async getItem(viewViewComponentId: string) {
    return this.findOne(viewViewComponentId);
  }

  async importWfViewComponent(viewViewComponentId: string) {
    // return this.repository.findOne( {where:{ viewViewComponentId }});
  }

  async insert(entity: WfViewComponent) {
    const { identifiers } = await this.repository.insert(entity);
    return this.findOne(identifiers[0].viewViewComponentId)
  }

  async insertBatch(entity: WfViewComponent[]) {
    const { identifiers } = await this.repository.createQueryBuilder().insert().values(entity).execute()
    return await this.repository.find({
      where: {
        viewViewComponentId: In(identifiers.map(item => item.viewViewComponentId))
      }
    })
  }

  async queryList(params:QueryDto) {
    return queryParams(params, this)
  }
  save(entity: WfViewComponent) {
    return this.repository.save(entity);

  }
  saveBatch(entity: WfViewComponent[]) {
    return this.repository.save(entity);
  }

  async update(entity: WfViewComponent) {
    const existingData = await this.findOne(entity.viewViewComponentId);
    const mergedWfViewComponent = this.repository.merge(existingData, entity);
    this.repository.update(entity.viewViewComponentId, mergedWfViewComponent)
  }

  async updateBatch(entity: WfViewComponent[]) {
    for await (const entityItem of entity) {
      this.update(entityItem)
    }
  }
}
