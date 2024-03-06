import {
  Controller,
  Post,
  Body,
  Query,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { SfProjectService } from './sfProject.service';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { SfProject } from './sfProject.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as xlsx from 'xlsx';
import { QueryDto } from '../../../common/query.dto';
import { nanoid } from "nanoid";

@ApiTags('项目接口')
@Controller('/sfBase/sfProject')
export class SfProjectController {
  constructor(private readonly sfProjectService: SfProjectService) {}

  @Post('deleteSfProjectBatch')
  @ApiOperation({ summary: '删除项目(批量、递归)' })
  deleteSfProjectBatch(@Body() projectIdList: string[]) {
    return this.sfProjectService.deleteBatch(projectIdList);
  }

  @Post('downloadSfProjectTemplate')
  @ApiOperation({ summary: '导出项目模板下载' })
  async downloadSfProjectTemplate(@Res() res: Response): Promise<void> {
    const data = await this.sfProjectService.findAll();
    const firstData = data[0];
    const fileName = 'SfProject_template.xlsx';
    const result = {};
    Object.keys(firstData).forEach((key) => {
      result[key] = null;
    });
    return this.sfProjectService.exportExcel([result], res, fileName);
  }

  @Post('exportSfProject')
  @ApiOperation({ summary: '导出项目' })
  async exportSfProject(@Res() res: Response): Promise<void> {
    const fileName = 'SfProject.xlsx';
    const data = await this.sfProjectService.findAll();
    return this.sfProjectService.exportExcel(data, res, fileName);
  }

  @Post('getSfProject')
  @ApiOperation({ summary: '获取项目' })
  getSfProject(@Query('projectId') projectId: string) {
    return this.sfProjectService.getItem(projectId);
  }

  @Post('importSfProject')
  @ApiOperation({ summary: '导入项目' })
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: '文件上传,返回 url 地址' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          description: '文件',
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  importSfProject(@UploadedFile() file: Express.Multer.File) {
    // const reader = new FileReader();
    // reader.onload = function (event) {
      //   var data = event.target.result;
      //   var workbook = xlsx.read(data, { type: 'binary' });
      //   // 读取第一个工作表的所有数据
      //   var sheet1 = workbook.Sheets[workbook.SheetNames[0]];
      //   var rows = xlsx.utils.sheet_to_json(sheet1);
      //   // 处理读取出来的数据
      //   console.log(rows);
      // };
      // console.log(file);
    // reader.readAsBinaryString(file);
    // 导入
    return 1;
  }

  @Post('insertSfProject')
  @ApiOperation({ summary: '增加项目' })
  insertSfProject(@Body() entity: SfProject) {
    return this.sfProjectService.insert(entity);
  }

  @Post('insertSfProjectBatch')
  @ApiOperation({ summary: '增加项目(批量)' })
  insertSfProjectBatch(@Body() entity: SfProject[]) {
    return this.sfProjectService.insertBatch(entity);
  }

  @Post('querySfProject')
  @ApiOperation({ summary: '查询项目列表结果' })
  querySfProject(@Body() condition:QueryDto) {
    return this.sfProjectService.queryList(condition)
  }

  @Post('saveSfProject')
  @ApiOperation({ summary: '保存项目' })
  saveSfProject(@Body() entity: SfProject) {
    if(!entity.projectId){
      entity.projectId = nanoid()
    }
    return this.sfProjectService.save(entity);
  }

  @Post('saveSfProjectBatch')
  @ApiOperation({ summary: '保存项目(批量)' })
  saveSfProjectBatch(@Body() entity: SfProject[]) {
    entity.forEach(entityItem=>{
      if(!entityItem.projectId){
        entityItem.projectId = nanoid()
      }
    })
    return this.sfProjectService.saveBatch(entity);
  }

  @Post('updateSfProject')
  @ApiOperation({ summary: '修改项目' })
  updateSfProject(@Body() entity: SfProject) {
    return this.sfProjectService.update(entity);
  }

  @Post('updateSfProjectBatch')
  @ApiOperation({ summary: '修改项目(批量)' })
  updateSfProjectBatch(@Body() entity: SfProject[]) {
    return this.sfProjectService.updateBatch(entity);
  }
}
