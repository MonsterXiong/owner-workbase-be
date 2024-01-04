import {
  Controller,
  Post,
  Body,
  Query,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { ZyDatabasePoolService } from './zyDatabasePool.service';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { ZyDatabasePool } from './zyDatabasePool.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as xlsx from 'xlsx';
import { QueryDto } from '@/common/query.dto';

@ApiTags('数据池接口')
@Controller('/base/zyDatabasePool')
export class ZyDatabasePoolController {
  constructor(private readonly zyDatabasePoolService: ZyDatabasePoolService) {}

  @Post('deleteZyDatabasePoolBatch')
  @ApiOperation({ summary: '删除数据池(批量、递归)' })
  deleteZyDatabasePoolBatch(@Body() databaseIdList: string[]) {
    return this.zyDatabasePoolService.deleteBatch(databaseIdList);
  }

  @Post('downloadZyDatabasePoolTemplate')
  @ApiOperation({ summary: '导出数据池模板下载' })
  async downloadZyDatabasePoolTemplate(@Res() res: Response): Promise<void> {
    const data = await this.zyDatabasePoolService.findAll();
    const firstData = data[0];
    const fileName = 'ZyDatabasePool_template.xlsx';
    const result = {};
    Object.keys(firstData).forEach((key) => {
      result[key] = null;
    });
    return this.zyDatabasePoolService.exportExcel([result], res, fileName);
  }

  @Post('exportZyDatabasePool')
  @ApiOperation({ summary: '导出数据池' })
  async exportZyDatabasePool(@Res() res: Response): Promise<void> {
    const fileName = 'ZyDatabasePool.xlsx';
    const data = await this.zyDatabasePoolService.findAll();
    return this.zyDatabasePoolService.exportExcel(data, res, fileName);
  }

  @Post('getZyDatabasePool')
  @ApiOperation({ summary: '获取数据池' })
  getZyDatabasePool(@Query('databaseId') databaseId: string) {
    return this.zyDatabasePoolService.getItem(databaseId);
  }

  @Post('importZyDatabasePool')
  @ApiOperation({ summary: '导入数据池' })
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
  importZyDatabasePool(@UploadedFile() file: Express.Multer.File) {
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

  @Post('insertZyDatabasePool')
  @ApiOperation({ summary: '增加数据池' })
  insertZyDatabasePool(@Body() entity: ZyDatabasePool) {
    return this.zyDatabasePoolService.insert(entity);
  }

  @Post('insertZyDatabasePoolBatch')
  @ApiOperation({ summary: '增加数据池(批量)' })
  insertZyDatabasePoolBatch(@Body() entity: ZyDatabasePool[]) {
    return this.zyDatabasePoolService.insertBatch(entity);
  }

  @Post('queryZyDatabasePool')
  @ApiOperation({ summary: '查询数据池列表结果' })
  queryZyDatabasePool(@Body() condition:QueryDto) {
    return this.zyDatabasePoolService.queryList(condition)
  }

  @Post('saveZyDatabasePool')
  @ApiOperation({ summary: '保存数据池' })
  saveZyDatabasePool(@Body() entity: ZyDatabasePool) {
    return this.zyDatabasePoolService.save(entity);
  }

  @Post('saveZyDatabasePoolBatch')
  @ApiOperation({ summary: '保存数据池(批量)' })
  saveZyDatabasePoolBatch(@Body() entity: ZyDatabasePool[]) {
    return this.zyDatabasePoolService.saveBatch(entity);
  }

  @Post('updateZyDatabasePool')
  @ApiOperation({ summary: '修改数据池' })
  updateZyDatabasePool(@Body() entity: ZyDatabasePool) {
    return this.zyDatabasePoolService.update(entity);
  }

  @Post('updateZyDatabasePoolBatch')
  @ApiOperation({ summary: '修改数据池(批量)' })
  updateZyDatabasePoolBatch(@Body() entity: ZyDatabasePool[]) {
    return this.zyDatabasePoolService.updateBatch(entity);
  }
}
