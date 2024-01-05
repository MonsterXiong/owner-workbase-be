import {
  Controller,
  Post,
  Body,
  Query,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { WfViewPageService } from './wfViewPage.service';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { WfViewPage } from './wfViewPage.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as xlsx from 'xlsx';
import { QueryDto } from '@/common/query.dto';

@ApiTags('页面接口')
@Controller('/base/wfViewPage')
export class WfViewPageController {
  constructor(private readonly wfViewPageService: WfViewPageService) {}

  @Post('deleteWfViewPageBatch')
  @ApiOperation({ summary: '删除页面(批量、递归)' })
  deleteWfViewPageBatch(@Body() viewPageIdList: string[]) {
    return this.wfViewPageService.deleteBatch(viewPageIdList);
  }

  @Post('downloadWfViewPageTemplate')
  @ApiOperation({ summary: '导出页面模板下载' })
  async downloadWfViewPageTemplate(@Res() res: Response): Promise<void> {
    const data = await this.wfViewPageService.findAll();
    const firstData = data[0];
    const fileName = 'WfViewPage_template.xlsx';
    const result = {};
    Object.keys(firstData).forEach((key) => {
      result[key] = null;
    });
    return this.wfViewPageService.exportExcel([result], res, fileName);
  }

  @Post('exportWfViewPage')
  @ApiOperation({ summary: '导出页面' })
  async exportWfViewPage(@Res() res: Response): Promise<void> {
    const fileName = 'WfViewPage.xlsx';
    const data = await this.wfViewPageService.findAll();
    return this.wfViewPageService.exportExcel(data, res, fileName);
  }

  @Post('getWfViewPage')
  @ApiOperation({ summary: '获取页面' })
  getWfViewPage(@Query('viewPageId') viewPageId: string) {
    return this.wfViewPageService.getItem(viewPageId);
  }

  @Post('importWfViewPage')
  @ApiOperation({ summary: '导入页面' })
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
  importWfViewPage(@UploadedFile() file: Express.Multer.File) {
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

  @Post('insertWfViewPage')
  @ApiOperation({ summary: '增加页面' })
  insertWfViewPage(@Body() entity: WfViewPage) {
    return this.wfViewPageService.insert(entity);
  }

  @Post('insertWfViewPageBatch')
  @ApiOperation({ summary: '增加页面(批量)' })
  insertWfViewPageBatch(@Body() entity: WfViewPage[]) {
    return this.wfViewPageService.insertBatch(entity);
  }

  @Post('queryWfViewPage')
  @ApiOperation({ summary: '查询页面列表结果' })
  queryWfViewPage(@Body() condition:QueryDto) {
    return this.wfViewPageService.queryList(condition)
  }

  @Post('saveWfViewPage')
  @ApiOperation({ summary: '保存页面' })
  saveWfViewPage(@Body() entity: WfViewPage) {
    return this.wfViewPageService.save(entity);
  }

  @Post('saveWfViewPageBatch')
  @ApiOperation({ summary: '保存页面(批量)' })
  saveWfViewPageBatch(@Body() entity: WfViewPage[]) {
    return this.wfViewPageService.saveBatch(entity);
  }

  @Post('updateWfViewPage')
  @ApiOperation({ summary: '修改页面' })
  updateWfViewPage(@Body() entity: WfViewPage) {
    return this.wfViewPageService.update(entity);
  }

  @Post('updateWfViewPageBatch')
  @ApiOperation({ summary: '修改页面(批量)' })
  updateWfViewPageBatch(@Body() entity: WfViewPage[]) {
    return this.wfViewPageService.updateBatch(entity);
  }
}
