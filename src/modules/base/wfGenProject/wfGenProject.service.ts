import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository  } from 'typeorm';
import { WfGenProject } from "./wfGenProject.entity";
import { queryParams } from '@/utils/sqlUtil'
import * as xlsx from 'xlsx';
import {Response} from 'express';
import { QueryDto } from '@/common/query.dto';
@Injectable()
export class WfGenProjectService {
  constructor(
    @InjectRepository(WfGenProject)
    private repository: Repository<WfGenProject>,
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

  async importWfGenProject(projectId: string) {
    // return this.repository.findOne( {where:{ projectId }});
  }

  async insert(entity: WfGenProject) {
    const { identifiers } = await this.repository.insert(entity);
    return this.findOne(identifiers[0].projectId)
  }

  async insertBatch(entity: WfGenProject[]) {
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
  save(entity: WfGenProject) {
    return this.repository.save(entity);

  }
  saveBatch(entity: WfGenProject[]) {
    return this.repository.save(entity);
  }

  async update(entity: WfGenProject) {
    const existingData = await this.findOne(entity.projectId);
    const mergedWfGenProject = this.repository.merge(existingData, entity);
    this.repository.update(entity.projectId, mergedWfGenProject)
  }

  async updateBatch(entity: WfGenProject[]) {
    for await (const entityItem of entity) {
      this.update(entityItem)
    }
  }
}
