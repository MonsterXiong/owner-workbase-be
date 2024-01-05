import {
  Controller,
  Post,
  Body,
  Query,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { WfDefTableService } from './wfDefTable.service';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { WfDefTable } from './wfDefTable.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as xlsx from 'xlsx';
import { QueryDto } from '@/common/query.dto';

@ApiTags('表定义接口')
@Controller('/base/wfDefTable')
export class WfDefTableController {
  constructor(private readonly wfDefTableService: WfDefTableService) {}

  @Post('deleteWfDefTableBatch')
  @ApiOperation({ summary: '删除表定义(批量、递归)' })
  deleteWfDefTableBatch(@Body() tableIdList: string[]) {
    return this.wfDefTableService.deleteBatch(tableIdList);
  }

  @Post('downloadWfDefTableTemplate')
  @ApiOperation({ summary: '导出表定义模板下载' })
  async downloadWfDefTableTemplate(@Res() res: Response): Promise<void> {
    const data = await this.wfDefTableService.findAll();
    const firstData = data[0];
    const fileName = 'WfDefTable_template.xlsx';
    const result = {};
    Object.keys(firstData).forEach((key) => {
      result[key] = null;
    });
    return this.wfDefTableService.exportExcel([result], res, fileName);
  }

  @Post('exportWfDefTable')
  @ApiOperation({ summary: '导出表定义' })
  async exportWfDefTable(@Res() res: Response): Promise<void> {
    const fileName = 'WfDefTable.xlsx';
    const data = await this.wfDefTableService.findAll();
    return this.wfDefTableService.exportExcel(data, res, fileName);
  }

  @Post('getWfDefTable')
  @ApiOperation({ summary: '获取表定义' })
  getWfDefTable(@Query('tableId') tableId: string) {
    return this.wfDefTableService.getItem(tableId);
  }

  @Post('importWfDefTable')
  @ApiOperation({ summary: '导入表定义' })
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
  importWfDefTable(@UploadedFile() file: Express.Multer.File) {
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

  @Post('insertWfDefTable')
  @ApiOperation({ summary: '增加表定义' })
  insertWfDefTable(@Body() entity: WfDefTable) {
    return this.wfDefTableService.insert(entity);
  }

  @Post('insertWfDefTableBatch')
  @ApiOperation({ summary: '增加表定义(批量)' })
  insertWfDefTableBatch(@Body() entity: WfDefTable[]) {
    return this.wfDefTableService.insertBatch(entity);
  }

  @Post('queryWfDefTable')
  @ApiOperation({ summary: '查询表定义列表结果' })
  queryWfDefTable(@Body() condition:QueryDto) {
    return this.wfDefTableService.queryList(condition)
  }

  @Post('saveWfDefTable')
  @ApiOperation({ summary: '保存表定义' })
  saveWfDefTable(@Body() entity: WfDefTable) {
    return this.wfDefTableService.save(entity);
  }

  @Post('saveWfDefTableBatch')
  @ApiOperation({ summary: '保存表定义(批量)' })
  saveWfDefTableBatch(@Body() entity: WfDefTable[]) {
    return this.wfDefTableService.saveBatch(entity);
  }

  @Post('updateWfDefTable')
  @ApiOperation({ summary: '修改表定义' })
  updateWfDefTable(@Body() entity: WfDefTable) {
    return this.wfDefTableService.update(entity);
  }

  @Post('updateWfDefTableBatch')
  @ApiOperation({ summary: '修改表定义(批量)' })
  updateWfDefTableBatch(@Body() entity: WfDefTable[]) {
    return this.wfDefTableService.updateBatch(entity);
  }
}
