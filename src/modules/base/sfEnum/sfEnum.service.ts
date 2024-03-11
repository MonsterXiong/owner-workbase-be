import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository  } from 'typeorm';
import { SfEnum } from "./sfEnum.entity";
import { queryParams } from '../../../utils/sqlUtil'
import * as xlsx from 'xlsx';
import {Response} from 'express';
import { QueryDto } from '../../../common/query.dto';
@Injectable()
export class SfEnumService {
  constructor(
    @InjectRepository(SfEnum)
    private repository: Repository<SfEnum>,
  ) { }

  async findOne(enumId) {
    return await this.repository.findOne({where: { isdel:'0',enumId } });
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

  async getItem(enumId: string) {
    return this.findOne(enumId);
  }

  async importSfEnum(enumId: string) {
    // return this.repository.findOne( {where:{ enumId }});
  }

  async insert(entity: SfEnum) {
    const { identifiers } = await this.repository.insert(entity);
    return this.findOne(identifiers[0].enumId)
  }

  async insertBatch(entity: SfEnum[]) {
    const { identifiers } = await this.repository.createQueryBuilder().insert().values(entity).execute()
    return await this.repository.find({
      where: {
        enumId: In(identifiers.map(item => item.enumId))
      }
    })
  }

  async queryList(params:QueryDto) {
    return queryParams(params, this)
  }
  save(entity: SfEnum) {
    return this.repository.save(entity);

  }
  saveBatch(entity: SfEnum[]) {
    return this.repository.save(entity);
  }

  async update(entity: SfEnum) {
    const existingData = await this.findOne(entity.enumId);
    const mergedSfEnum = this.repository.merge(existingData, entity);
    this.repository.update(entity.enumId, mergedSfEnum)
  }

  async updateBatch(entity: SfEnum[]) {
    for await (const entityItem of entity) {
      this.update(entityItem)
    }
  }
}
