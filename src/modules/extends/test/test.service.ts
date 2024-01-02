import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository  } from 'typeorm';
import { Test } from "./test.entity";
import { queryParams } from '../../../utils/sqlUtil'
import * as xlsx from 'xlsx';
import {Response} from 'express';
import { QueryDto } from '@/common/query.dto';


@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test)
    private repository: Repository<Test>,
  ) { }

  async findOne(testId) {
    return await this.repository.findOne({ where: { id: testId } });
  }

  async findAll(){
    return await this.repository.find()
  }

  async deleteTestBatch(ids: string[]): Promise<void> {
    await this.repository.softDelete(ids);
  }

  async exportExcel(data:any[],res: Response,fileName:string) {
    console.log(data,fileName);

    const worksheet = xlsx.utils.json_to_sheet(data);
    console.log('worksheet',worksheet);

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

  async getTest(testId: string) {
    return this.findOne(testId);
  }

  async importTest(testId: string) {
    // return this.repository.findOne( {where:{ id:testId }});
  }

  async insertTest(entity: Test) {
    const { identifiers } = await this.repository.insert(entity);
    return this.findOne(identifiers[0].id)
  }

  async insertTestBatch(entity: Test[]) {
    const { identifiers } = await this.repository.createQueryBuilder().insert().values(entity).execute()
    return await this.repository.find({
      where: {
        id: In(identifiers.map(item => item.id))
      }
    })
  }

  async queryTest(params:QueryDto) {
    return queryParams(params, this)
  }
  saveTest(entity: Test) {
    return this.repository.save(entity);

  }
  saveTestBatch(entity: Test[]) {
    return this.repository.save(entity);
  }

  async update(entity: Test) {
    const existingData = await this.findOne(entity.id);
    const mergedTest = this.repository.merge(existingData, entity);
    this.repository.update(entity.id, mergedTest)
  }

  async updateTestBatch(entity: Test[]) {
    for await (const entityItem of entity) {
      this.update(entityItem)
    }
  }

}
