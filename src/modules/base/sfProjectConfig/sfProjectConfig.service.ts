import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository  } from 'typeorm';
import { SfProjectConfig } from "./sfProjectConfig.entity";
import { queryParams } from '../../../utils/sqlUtil'
import * as xlsx from 'xlsx';
import {Response} from 'express';
import { QueryDto } from '../../../common/query.dto';
@Injectable()
export class SfProjectConfigService {
  constructor(
    @InjectRepository(SfProjectConfig)
    private repository: Repository<SfProjectConfig>,
  ) { }

  async findOne(projectConfigId) {
    return await this.repository.findOne({where: { isdel:'0',projectConfigId } });
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

  async getItem(projectConfigId: string) {
    return this.findOne(projectConfigId);
  }

  async importSfProjectConfig(projectConfigId: string) {
    // return this.repository.findOne( {where:{ projectConfigId }});
  }

  async insert(entity: SfProjectConfig) {
    const { identifiers } = await this.repository.insert(entity);
    return this.findOne(identifiers[0].projectConfigId)
  }

  async insertBatch(entity: SfProjectConfig[]) {
    const { identifiers } = await this.repository.createQueryBuilder().insert().values(entity).execute()
    return await this.repository.find({
      where: {
        projectConfigId: In(identifiers.map(item => item.projectConfigId))
      }
    })
  }

  async queryList(params:QueryDto) {
    return queryParams(params, this)
  }
  save(entity: SfProjectConfig) {
    return this.repository.save(entity);

  }
  saveBatch(entity: SfProjectConfig[]) {
    return this.repository.save(entity);
  }

  async update(entity: SfProjectConfig) {
    const existingData = await this.findOne(entity.projectConfigId);
    const mergedSfProjectConfig = this.repository.merge(existingData, entity);
    this.repository.update(entity.projectConfigId, mergedSfProjectConfig)
  }

  async updateBatch(entity: SfProjectConfig[]) {
    for await (const entityItem of entity) {
      this.update(entityItem)
    }
  }
}
