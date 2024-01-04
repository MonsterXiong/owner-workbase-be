import {
  Controller,
  Post,
  Body,
  Query,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { WfGenProjectRecordService } from './wfGenProjectRecord.service';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { WfGenProjectRecord } from './wfGenProjectRecord.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as xlsx from 'xlsx';
import { QueryDto } from '@/common/query.dto';

@ApiTags('项目生成记录接口')
@Controller('/base/wfGenProjectRecord')
export class WfGenProjectRecordController {
  constructor(private readonly wfGenProjectRecordService: WfGenProjectRecordService) {}

  @Post('deleteWfGenProjectRecordBatch')
  @ApiOperation({ summary: '删除项目生成记录(批量、递归)' })
  deleteWfGenProjectRecordBatch(@Body() genProjectRecordIdList: string[]) {
    return this.wfGenProjectRecordService.deleteBatch(genProjectRecordIdList);
  }

  @Post('downloadWfGenProjectRecordTemplate')
  @ApiOperation({ summary: '导出项目生成记录模板下载' })
  async downloadWfGenProjectRecordTemplate(@Res() res: Response): Promise<void> {
    const data = await this.wfGenProjectRecordService.findAll();
    const firstData = data[0];
    const fileName = 'WfGenProjectRecord_template.xlsx';
    const result = {};
    Object.keys(firstData).forEach((key) => {
      result[key] = null;
    });
    return this.wfGenProjectRecordService.exportExcel([result], res, fileName);
  }

  @Post('exportWfGenProjectRecord')
  @ApiOperation({ summary: '导出项目生成记录' })
  async exportWfGenProjectRecord(@Res() res: Response): Promise<void> {
    const fileName = 'WfGenProjectRecord.xlsx';
    const data = await this.wfGenProjectRecordService.findAll();
    return this.wfGenProjectRecordService.exportExcel(data, res, fileName);
  }

  @Post('getWfGenProjectRecord')
  @ApiOperation({ summary: '获取项目生成记录' })
  getWfGenProjectRecord(@Query('genProjectRecordId') genProjectRecordId: string) {
    return this.wfGenProjectRecordService.getItem(genProjectRecordId);
  }

  @Post('importWfGenProjectRecord')
  @ApiOperation({ summary: '导入项目生成记录' })
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
  importWfGenProjectRecord(@UploadedFile() file: Express.Multer.File) {
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

  @Post('insertWfGenProjectRecord')
  @ApiOperation({ summary: '增加项目生成记录' })
  insertWfGenProjectRecord(@Body() entity: WfGenProjectRecord) {
    return this.wfGenProjectRecordService.insert(entity);
  }

  @Post('insertWfGenProjectRecordBatch')
  @ApiOperation({ summary: '增加项目生成记录(批量)' })
  insertWfGenProjectRecordBatch(@Body() entity: WfGenProjectRecord[]) {
    return this.wfGenProjectRecordService.insertBatch(entity);
  }

  @Post('queryWfGenProjectRecord')
  @ApiOperation({ summary: '查询项目生成记录列表结果' })
  queryWfGenProjectRecord(@Body() condition:QueryDto) {
    return this.wfGenProjectRecordService.queryList(condition)
  }

  @Post('saveWfGenProjectRecord')
  @ApiOperation({ summary: '保存项目生成记录' })
  saveWfGenProjectRecord(@Body() entity: WfGenProjectRecord) {
    return this.wfGenProjectRecordService.save(entity);
  }

  @Post('saveWfGenProjectRecordBatch')
  @ApiOperation({ summary: '保存项目生成记录(批量)' })
  saveWfGenProjectRecordBatch(@Body() entity: WfGenProjectRecord[]) {
    return this.wfGenProjectRecordService.saveBatch(entity);
  }

  @Post('updateWfGenProjectRecord')
  @ApiOperation({ summary: '修改项目生成记录' })
  updateWfGenProjectRecord(@Body() entity: WfGenProjectRecord) {
    return this.wfGenProjectRecordService.update(entity);
  }

  @Post('updateWfGenProjectRecordBatch')
  @ApiOperation({ summary: '修改项目生成记录(批量)' })
  updateWfGenProjectRecordBatch(@Body() entity: WfGenProjectRecord[]) {
    return this.wfGenProjectRecordService.updateBatch(entity);
  }
}
