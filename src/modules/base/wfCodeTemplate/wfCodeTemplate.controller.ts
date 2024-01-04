import {
  Controller,
  Post,
  Body,
  Query,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { WfCodeTemplateService } from './wfCodeTemplate.service';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { WfCodeTemplate } from './wfCodeTemplate.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as xlsx from 'xlsx';
import { QueryDto } from '@/common/query.dto';

@ApiTags('框架代码接口')
@Controller('/base/wfCodeTemplate')
export class WfCodeTemplateController {
  constructor(private readonly wfCodeTemplateService: WfCodeTemplateService) {}

  @Post('deleteWfCodeTemplateBatch')
  @ApiOperation({ summary: '删除框架代码(批量、递归)' })
  deleteWfCodeTemplateBatch(@Body() codeTemplateIdList: string[]) {
    return this.wfCodeTemplateService.deleteBatch(codeTemplateIdList);
  }

  @Post('downloadWfCodeTemplateTemplate')
  @ApiOperation({ summary: '导出框架代码模板下载' })
  async downloadWfCodeTemplateTemplate(@Res() res: Response): Promise<void> {
    const data = await this.wfCodeTemplateService.findAll();
    const firstData = data[0];
    const fileName = 'WfCodeTemplate_template.xlsx';
    const result = {};
    Object.keys(firstData).forEach((key) => {
      result[key] = null;
    });
    return this.wfCodeTemplateService.exportExcel([result], res, fileName);
  }

  @Post('exportWfCodeTemplate')
  @ApiOperation({ summary: '导出框架代码' })
  async exportWfCodeTemplate(@Res() res: Response): Promise<void> {
    const fileName = 'WfCodeTemplate.xlsx';
    const data = await this.wfCodeTemplateService.findAll();
    return this.wfCodeTemplateService.exportExcel(data, res, fileName);
  }

  @Post('getWfCodeTemplate')
  @ApiOperation({ summary: '获取框架代码' })
  getWfCodeTemplate(@Query('codeTemplateId') codeTemplateId: string) {
    return this.wfCodeTemplateService.getItem(codeTemplateId);
  }

  @Post('importWfCodeTemplate')
  @ApiOperation({ summary: '导入框架代码' })
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
  importWfCodeTemplate(@UploadedFile() file: Express.Multer.File) {
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

  @Post('insertWfCodeTemplate')
  @ApiOperation({ summary: '增加框架代码' })
  insertWfCodeTemplate(@Body() entity: WfCodeTemplate) {
    return this.wfCodeTemplateService.insert(entity);
  }

  @Post('insertWfCodeTemplateBatch')
  @ApiOperation({ summary: '增加框架代码(批量)' })
  insertWfCodeTemplateBatch(@Body() entity: WfCodeTemplate[]) {
    return this.wfCodeTemplateService.insertBatch(entity);
  }

  @Post('queryWfCodeTemplate')
  @ApiOperation({ summary: '查询框架代码列表结果' })
  queryWfCodeTemplate(@Body() condition:QueryDto) {
    return this.wfCodeTemplateService.queryList(condition)
  }

  @Post('saveWfCodeTemplate')
  @ApiOperation({ summary: '保存框架代码' })
  saveWfCodeTemplate(@Body() entity: WfCodeTemplate) {
    return this.wfCodeTemplateService.save(entity);
  }

  @Post('saveWfCodeTemplateBatch')
  @ApiOperation({ summary: '保存框架代码(批量)' })
  saveWfCodeTemplateBatch(@Body() entity: WfCodeTemplate[]) {
    return this.wfCodeTemplateService.saveBatch(entity);
  }

  @Post('updateWfCodeTemplate')
  @ApiOperation({ summary: '修改框架代码' })
  updateWfCodeTemplate(@Body() entity: WfCodeTemplate) {
    return this.wfCodeTemplateService.update(entity);
  }

  @Post('updateWfCodeTemplateBatch')
  @ApiOperation({ summary: '修改框架代码(批量)' })
  updateWfCodeTemplateBatch(@Body() entity: WfCodeTemplate[]) {
    return this.wfCodeTemplateService.updateBatch(entity);
  }
}
