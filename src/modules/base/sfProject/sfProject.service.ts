import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository  } from 'typeorm';
import { SfProject } from "./sfProject.entity";
import { queryParams } from '../../../utils/sqlUtil'
import * as xlsx from 'xlsx';
import {Response} from 'express';
import { QueryDto } from '../../../common/query.dto';
@Injectable()
export class SfProjectService {
  constructor(
    @InjectRepository(SfProject)
    private repository: Repository<SfProject>,
  ) { }

  async findOne(projectId) {
    return await this.repository.findOne({where: { isdel:'0',projectId } });
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

  async getItem(projectId: string) {
    return this.findOne(projectId);
  }

  async importSfProject(projectId: string) {
    // return this.repository.findOne( {where:{ projectId }});
  }

  async insert(entity: SfProject) {
    const { identifiers } = await this.repository.insert(entity);
    return this.findOne(identifiers[0].projectId)
  }

  async insertBatch(entity: SfProject[]) {
    const { identifiers } = await this.repository.createQueryBuilder().insert().values(entity).execute()
    return await this.repository.find({
      where: {
        projectId: In(identifiers.map(item => item.projectId))
      }
    })
  }

  async queryList(params:QueryDto) {
    return queryParams(params, this)
  }
  save(entity: SfProject) {
    return this.repository.save(entity);
  }
  saveBatch(entity: SfProject[]) {
    return this.repository.save(entity);
  }

  async update(entity: SfProject) {
    const existingData = await this.findOne(entity.projectId);
    const mergedSfProject = this.repository.merge(existingData, entity);
    this.repository.update(entity.projectId, mergedSfProject)
  }

  async updateBatch(entity: SfProject[]) {
    for await (const entityItem of entity) {
      this.update(entityItem)
    }
  }
}
