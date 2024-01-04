import {
  Controller,
  Post,
  Body,
  Query,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { WfGenProjectService } from './wfGenProject.service';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { WfGenProject } from './wfGenProject.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as xlsx from 'xlsx';
import { QueryDto } from '@/common/query.dto';

@ApiTags('项目接口')
@Controller('/base/wfGenProject')
export class WfGenProjectController {
  constructor(private readonly wfGenProjectService: WfGenProjectService) {}

  @Post('deleteWfGenProjectBatch')
  @ApiOperation({ summary: '删除项目(批量、递归)' })
  deleteWfGenProjectBatch(@Body() projectIdList: string[]) {
    return this.wfGenProjectService.deleteBatch(projectIdList);
  }

  @Post('downloadWfGenProjectTemplate')
  @ApiOperation({ summary: '导出项目模板下载' })
  async downloadWfGenProjectTemplate(@Res() res: Response): Promise<void> {
    const data = await this.wfGenProjectService.findAll();
    const firstData = data[0];
    const fileName = 'WfGenProject_template.xlsx';
    const result = {};
    Object.keys(firstData).forEach((key) => {
      result[key] = null;
    });
    return this.wfGenProjectService.exportExcel([result], res, fileName);
  }

  @Post('exportWfGenProject')
  @ApiOperation({ summary: '导出项目' })
  async exportWfGenProject(@Res() res: Response): Promise<void> {
    const fileName = 'WfGenProject.xlsx';
    const data = await this.wfGenProjectService.findAll();
    return this.wfGenProjectService.exportExcel(data, res, fileName);
  }

  @Post('getWfGenProject')
  @ApiOperation({ summary: '获取项目' })
  getWfGenProject(@Query('projectId') projectId: string) {
    return this.wfGenProjectService.getItem(projectId);
  }

  @Post('importWfGenProject')
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
  importWfGenProject(@UploadedFile() file: Express.Multer.File) {
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

  @Post('insertWfGenProject')
  @ApiOperation({ summary: '增加项目' })
  insertWfGenProject(@Body() entity: WfGenProject) {
    return this.wfGenProjectService.insert(entity);
  }

  @Post('insertWfGenProjectBatch')
  @ApiOperation({ summary: '增加项目(批量)' })
  insertWfGenProjectBatch(@Body() entity: WfGenProject[]) {
    return this.wfGenProjectService.insertBatch(entity);
  }

  @Post('queryWfGenProject')
  @ApiOperation({ summary: '查询项目列表结果' })
  queryWfGenProject(@Body() condition:QueryDto) {
    return this.wfGenProjectService.queryList(condition)
  }

  @Post('saveWfGenProject')
  @ApiOperation({ summary: '保存项目' })
  saveWfGenProject(@Body() entity: WfGenProject) {
    return this.wfGenProjectService.save(entity);
  }

  @Post('saveWfGenProjectBatch')
  @ApiOperation({ summary: '保存项目(批量)' })
  saveWfGenProjectBatch(@Body() entity: WfGenProject[]) {
    return this.wfGenProjectService.saveBatch(entity);
  }

  @Post('updateWfGenProject')
  @ApiOperation({ summary: '修改项目' })
  updateWfGenProject(@Body() entity: WfGenProject) {
    return this.wfGenProjectService.update(entity);
  }

  @Post('updateWfGenProjectBatch')
  @ApiOperation({ summary: '修改项目(批量)' })
  updateWfGenProjectBatch(@Body() entity: WfGenProject[]) {
    return this.wfGenProjectService.updateBatch(entity);
  }
}
