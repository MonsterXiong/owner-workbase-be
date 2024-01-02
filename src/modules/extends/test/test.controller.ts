import {
  Controller,
  Post,
  Body,
  Query,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { TestService } from './test.service';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import {  Test } from './test.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as xlsx from 'xlsx';
import { createReadStream } from 'fs';
import { QueryDto } from '@/common/query.dto';



@ApiTags('测试')
@Controller('/nbpgBase/test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post('deleteTestBatch')
  @ApiOperation({ summary: '删除Test(批量、递归)' })
  deleteTestBatch(@Body() ids: string[]) {
    return this.testService.deleteTestBatch(ids);
  }

  @Post('downloadTestTemplate')
  @ApiOperation({ summary: '导出模板下载' })
  async downloadTestTemplate(@Res() res: Response): Promise<void> {
    const data = await this.testService.findAll();
    const firstData = data[0];
    const fileName = 'Test_template.xlsx';
    const result = {};
    Object.keys(firstData).forEach((key) => {
      result[key] = null;
    });
    return this.testService.exportExcel([result], res, fileName);
  }

  @Post('exportTest')
  @ApiOperation({ summary: '导出Test' })
  async exportTest(@Res() res: Response): Promise<void> {
    const fileName = 'Test.xlsx';
    const data = await this.testService.findAll();
    return this.testService.exportExcel(data, res, fileName);
  }

  @Post('getTest')
  @ApiOperation({ summary: '获取Test' })
  getTest(@Query('testId') testId: string) {
    return this.testService.getTest(testId);
  }

  @Post('importTest')
  @ApiOperation({ summary: '导入Test' })
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: '文件上传,返回 url 地址' })
  @ApiConsumes('multipart/form-data')
  // @ApiConsumes('multipart/form-data')
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
  async importTest(@UploadedFile() file: Express.Multer.File) {
    // console.log(file);
    return '待开发'
    // const filePath = file.path;
    // const workbook = await xlsx.readFile(filePath)
    // console.log(workbook);

    // const reader = new createReadStream(file.buffer);
    // const reader = file
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
    // // reader.readAsBinaryString(file);
    // // 导入
    // return 1;
  }

  @Post('insertTest')
  @ApiOperation({ summary: '增加Test' })
  insertTest(@Body() entity: Test) {
    return this.testService.insertTest(entity);
  }

  @Post('insertTestBatch')
  @ApiOperation({ summary: '增加Test(批量)' })
  insertTestBatch(@Body() entity: Test[]) {
    return this.testService.insertTestBatch(entity);
  }

  @Post('queryTest')
  @ApiOperation({ summary: '查询Test列表结果' })
  queryTest(@Body() condition:QueryDto) {
    return this.testService.queryTest(condition)
  }

  @Post('saveTest')
  @ApiOperation({ summary: '保存Test' })
  saveTest(@Body() entity: Test) {
    return this.testService.saveTest(entity);
  }
  @Post('saveTestBatch')
  @ApiOperation({ summary: '保存Test(批量)' })
  saveTestBatch(@Body() entity: Test[]) {
    return this.testService.saveTestBatch(entity);
  }

  @Post('updateTest')
  @ApiOperation({ summary: '修改Test' })
  // updateTest(testId : string,@Body() entity: Test) {
  //   return this.testService.update(testId,entity);
  // }
  updateTest(@Body() entity: Test) {
    return this.testService.update(entity);
  }

  @Post('updateTestBatch')
  @ApiOperation({ summary: '修改Test(批量)' })
  updateTestBatch(@Body() entity: Test[]) {
    return this.testService.updateTestBatch(entity);
  }
}
