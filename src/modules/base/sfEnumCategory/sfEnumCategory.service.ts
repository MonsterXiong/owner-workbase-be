import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository  } from 'typeorm';
import { SfEnumCategory } from "./sfEnumCategory.entity";
import { queryParams } from '../../../utils/sqlUtil'
import * as xlsx from 'xlsx';
import {Response} from 'express';
import { QueryDto } from '../../../common/query.dto';
@Injectable()
export class SfEnumCategoryService {
  constructor(
    @InjectRepository(SfEnumCategory)
    private repository: Repository<SfEnumCategory>,
  ) { }

  async findOne(enumCategoryId) {
    return await this.repository.findOne({where: { isdel:'0',enumCategoryId } });
  }

  async findOneByParam(param) {
    return await this.repository.findOne({where: { isdel:'0',...param } });
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

  async getItem(enumCategoryId: string) {
    return this.findOne(enumCategoryId);
  }

  async importSfEnumCategory(enumCategoryId: string) {
    // return this.repository.findOne( {where:{ enumCategoryId }});
  }

  async insert(entity: SfEnumCategory) {
    const { identifiers } = await this.repository.insert(entity);
    return this.findOne(identifiers[0].enumCategoryId)
  }

  async insertBatch(entity: SfEnumCategory[]) {
    const { identifiers } = await this.repository.createQueryBuilder().insert().values(entity).execute()
    return await this.repository.find({
      where: {
        enumCategoryId: In(identifiers.map(item => item.enumCategoryId))
      }
    })
  }

  async queryList(params:QueryDto) {
    return queryParams(params, this)
  }
  save(entity: SfEnumCategory) {
    return this.repository.save(entity);

  }
  saveBatch(entity: SfEnumCategory[]) {
    return this.repository.save(entity);
  }

  async update(entity: SfEnumCategory) {
    const existingData = await this.findOne(entity.enumCategoryId);
    const mergedSfEnumCategory = this.repository.merge(existingData, entity);
    this.repository.update(entity.enumCategoryId, mergedSfEnumCategory)
  }

  async updateBatch(entity: SfEnumCategory[]) {
    for await (const entityItem of entity) {
      this.update(entityItem)
    }
  }
}
