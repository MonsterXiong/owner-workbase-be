import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository  } from 'typeorm';
import { SfMenu } from "./sfMenu.entity";
import { queryParams } from '../../../utils/sqlUtil'
import * as xlsx from 'xlsx';
import {Response} from 'express';
import { QueryDto } from '../../../common/query.dto';
@Injectable()
export class SfMenuService {
  constructor(
    @InjectRepository(SfMenu)
    private repository: Repository<SfMenu>,
  ) { }

  async findOne(menuId) {
    return await this.repository.findOne({where: { isdel:'0',menuId } });
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

  async getItem(menuId: string) {
    return this.findOne(menuId);
  }

  async importSfMenu(menuId: string) {
    // return this.repository.findOne( {where:{ menuId }});
  }

  async insert(entity: SfMenu) {
    const { identifiers } = await this.repository.insert(entity);
    return this.findOne(identifiers[0].menuId)
  }

  async insertBatch(entity: SfMenu[]) {
    const { identifiers } = await this.repository.createQueryBuilder().insert().values(entity).execute()
    return await this.repository.find({
      where: {
        menuId: In(identifiers.map(item => item.menuId))
      }
    })
  }

  async queryList(params:QueryDto) {
    return queryParams(params, this)
  }
  save(entity: SfMenu) {
    return this.repository.save(entity);

  }
  saveBatch(entity: SfMenu[]) {
    return this.repository.save(entity);
  }

  async update(entity: SfMenu) {
    const existingData = await this.findOne(entity.menuId);
    const mergedSfMenu = this.repository.merge(existingData, entity);
    this.repository.update(entity.menuId, mergedSfMenu)
  }

  async updateBatch(entity: SfMenu[]) {
    for await (const entityItem of entity) {
      this.update(entityItem)
    }
  }
}
