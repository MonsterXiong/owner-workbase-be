import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository  } from 'typeorm';
import { Test } from "./test.entity";
import { queryParams } from '@/utils/sqlUtil'
import * as xlsx from 'xlsx';
import {Response} from 'express';
import { QueryDto } from '@/common/query.dto';
@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test)
    private repository: Repository<Test>,
  ) { }

  async findOne(id) {
    return await this.repository.findOne({where: { isdel:'0',id } });
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

  async getItem(id: string) {
    return this.findOne(id);
  }

  async importTest(id: string) {
    // return this.repository.findOne( {where:{ id }});
  }

  async insert(entity: Test) {
    const { identifiers } = await this.repository.insert(entity);
    return this.findOne(identifiers[0].id)
  }

  async insertBatch(entity: Test[]) {
    const { identifiers } = await this.repository.createQueryBuilder().insert().values(entity).execute()
    return await this.repository.find({
      where: {
        id: In(identifiers.map(item => item.id))
      }
    })
  }

  async queryList(params:QueryDto) {
    return queryParams(params, this)
  }
  save(entity: Test) {
    return this.repository.save(entity);

  }
  saveBatch(entity: Test[]) {
    return this.repository.save(entity);
  }

  async update(entity: Test) {
    const existingData = await this.findOne(entity.id);
    const mergedTest = this.repository.merge(existingData, entity);
    this.repository.update(entity.id, mergedTest)
  }

  async updateBatch(entity: Test[]) {
    for await (const entityItem of entity) {
      this.update(entityItem)
    }
  }
}
