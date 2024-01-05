import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository  } from 'typeorm';
import { WfViewMenu } from "./wfViewMenu.entity";
import { queryParams } from '@/utils/sqlUtil'
import * as xlsx from 'xlsx';
import {Response} from 'express';
import { QueryDto } from '@/common/query.dto';
@Injectable()
export class WfViewMenuService {
  constructor(
    @InjectRepository(WfViewMenu)
    private repository: Repository<WfViewMenu>,
  ) { }

  async findOne(viewMenuId) {
    return await this.repository.findOne({where: { isdel:'0',viewMenuId } });
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

  async getItem(viewMenuId: string) {
    return this.findOne(viewMenuId);
  }

  async importWfViewMenu(viewMenuId: string) {
    // return this.repository.findOne( {where:{ viewMenuId }});
  }

  async insert(entity: WfViewMenu) {
    const { identifiers } = await this.repository.insert(entity);
    return this.findOne(identifiers[0].viewMenuId)
  }

  async insertBatch(entity: WfViewMenu[]) {
    const { identifiers } = await this.repository.createQueryBuilder().insert().values(entity).execute()
    return await this.repository.find({
      where: {
        viewMenuId: In(identifiers.map(item => item.viewMenuId))
      }
    })
  }

  async queryList(params:QueryDto) {
    return queryParams(params, this)
  }
  save(entity: WfViewMenu) {
    return this.repository.save(entity);

  }
  saveBatch(entity: WfViewMenu[]) {
    return this.repository.save(entity);
  }

  async update(entity: WfViewMenu) {
    const existingData = await this.findOne(entity.viewMenuId);
    const mergedWfViewMenu = this.repository.merge(existingData, entity);
    this.repository.update(entity.viewMenuId, mergedWfViewMenu)
  }

  async updateBatch(entity: WfViewMenu[]) {
    for await (const entityItem of entity) {
      this.update(entityItem)
    }
  }
}
