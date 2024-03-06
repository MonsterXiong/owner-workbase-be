import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository  } from 'typeorm';
import { SfMenuDetail } from "./sfMenuDetail.entity";
import { queryParams } from '../../../utils/sqlUtil'
import * as xlsx from 'xlsx';
import {Response} from 'express';
import { QueryDto } from '../../../common/query.dto';
@Injectable()
export class SfMenuDetailService {
  constructor(
    @InjectRepository(SfMenuDetail)
    private repository: Repository<SfMenuDetail>,
  ) { }

  async findOne(menuDetailId) {
    return await this.repository.findOne({where: { isdel:'0',menuDetailId } });
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

  async getItem(menuDetailId: string) {
    return this.findOne(menuDetailId);
  }

  async importSfMenuDetail(menuDetailId: string) {
    // return this.repository.findOne( {where:{ menuDetailId }});
  }

  async insert(entity: SfMenuDetail) {
    const { identifiers } = await this.repository.insert(entity);
    return this.findOne(identifiers[0].menuDetailId)
  }

  async insertBatch(entity: SfMenuDetail[]) {
    const { identifiers } = await this.repository.createQueryBuilder().insert().values(entity).execute()
    return await this.repository.find({
      where: {
        menuDetailId: In(identifiers.map(item => item.menuDetailId))
      }
    })
  }

  async queryList(params:QueryDto) {
    return queryParams(params, this)
  }
  save(entity: SfMenuDetail) {
    return this.repository.save(entity);

  }
  saveBatch(entity: SfMenuDetail[]) {
    return this.repository.save(entity);
  }

  async update(entity: SfMenuDetail) {
    const existingData = await this.findOne(entity.menuDetailId);
    const mergedSfMenuDetail = this.repository.merge(existingData, entity);
    this.repository.update(entity.menuDetailId, mergedSfMenuDetail)
  }

  async updateBatch(entity: SfMenuDetail[]) {
    for await (const entityItem of entity) {
      this.update(entityItem)
    }
  }
}
