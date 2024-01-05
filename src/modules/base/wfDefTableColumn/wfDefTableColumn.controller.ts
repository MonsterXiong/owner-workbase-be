import {
  Controller,
  Post,
  Body,
  Query,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { WfDefTableColumnService } from './wfDefTableColumn.service';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { WfDefTableColumn } from './wfDefTableColumn.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as xlsx from 'xlsx';
import { QueryDto } from '@/common/query.dto';

@ApiTags('列定义接口')
@Controller('/base/wfDefTableColumn')
export class WfDefTableColumnController {
  constructor(private readonly wfDefTableColumnService: WfDefTableColumnService) {}

  @Post('deleteWfDefTableColumnBatch')
  @ApiOperation({ summary: '删除列定义(批量、递归)' })
  deleteWfDefTableColumnBatch(@Body() tableColumnIdList: string[]) {
    return this.wfDefTableColumnService.deleteBatch(tableColumnIdList);
  }

  @Post('downloadWfDefTableColumnTemplate')
  @ApiOperation({ summary: '导出列定义模板下载' })
  async downloadWfDefTableColumnTemplate(@Res() res: Response): Promise<void> {
    const data = await this.wfDefTableColumnService.findAll();
    const firstData = data[0];
    const fileName = 'WfDefTableColumn_template.xlsx';
    const result = {};
    Object.keys(firstData).forEach((key) => {
      result[key] = null;
    });
    return this.wfDefTableColumnService.exportExcel([result], res, fileName);
  }

  @Post('exportWfDefTableColumn')
  @ApiOperation({ summary: '导出列定义' })
  async exportWfDefTableColumn(@Res() res: Response): Promise<void> {
    const fileName = 'WfDefTableColumn.xlsx';
    const data = await this.wfDefTableColumnService.findAll();
    return this.wfDefTableColumnService.exportExcel(data, res, fileName);
  }

  @Post('getWfDefTableColumn')
  @ApiOperation({ summary: '获取列定义' })
  getWfDefTableColumn(@Query('tableColumnId') tableColumnId: string) {
    return this.wfDefTableColumnService.getItem(tableColumnId);
  }

  @Post('importWfDefTableColumn')
  @ApiOperation({ summary: '导入列定义' })
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
  importWfDefTableColumn(@UploadedFile() file: Express.Multer.File) {
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

  @Post('insertWfDefTableColumn')
  @ApiOperation({ summary: '增加列定义' })
  insertWfDefTableColumn(@Body() entity: WfDefTableColumn) {
    return this.wfDefTableColumnService.insert(entity);
  }

  @Post('insertWfDefTableColumnBatch')
  @ApiOperation({ summary: '增加列定义(批量)' })
  insertWfDefTableColumnBatch(@Body() entity: WfDefTableColumn[]) {
    return this.wfDefTableColumnService.insertBatch(entity);
  }

  @Post('queryWfDefTableColumn')
  @ApiOperation({ summary: '查询列定义列表结果' })
  queryWfDefTableColumn(@Body() condition:QueryDto) {
    return this.wfDefTableColumnService.queryList(condition)
  }

  @Post('saveWfDefTableColumn')
  @ApiOperation({ summary: '保存列定义' })
  saveWfDefTableColumn(@Body() entity: WfDefTableColumn) {
    return this.wfDefTableColumnService.save(entity);
  }

  @Post('saveWfDefTableColumnBatch')
  @ApiOperation({ summary: '保存列定义(批量)' })
  saveWfDefTableColumnBatch(@Body() entity: WfDefTableColumn[]) {
    return this.wfDefTableColumnService.saveBatch(entity);
  }

  @Post('updateWfDefTableColumn')
  @ApiOperation({ summary: '修改列定义' })
  updateWfDefTableColumn(@Body() entity: WfDefTableColumn) {
    return this.wfDefTableColumnService.update(entity);
  }

  @Post('updateWfDefTableColumnBatch')
  @ApiOperation({ summary: '修改列定义(批量)' })
  updateWfDefTableColumnBatch(@Body() entity: WfDefTableColumn[]) {
    return this.wfDefTableColumnService.updateBatch(entity);
  }
}
