import {
  Controller,
  Post,
  Body,
  Query,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { WfViewComponentService } from './wfViewComponent.service';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { WfViewComponent } from './wfViewComponent.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as xlsx from 'xlsx';
import { QueryDto } from '@/common/query.dto';

@ApiTags('组件接口')
@Controller('/base/wfViewComponent')
export class WfViewComponentController {
  constructor(private readonly wfViewComponentService: WfViewComponentService) {}

  @Post('deleteWfViewComponentBatch')
  @ApiOperation({ summary: '删除组件(批量、递归)' })
  deleteWfViewComponentBatch(@Body() viewViewComponentIdList: string[]) {
    return this.wfViewComponentService.deleteBatch(viewViewComponentIdList);
  }

  @Post('downloadWfViewComponentTemplate')
  @ApiOperation({ summary: '导出组件模板下载' })
  async downloadWfViewComponentTemplate(@Res() res: Response): Promise<void> {
    const data = await this.wfViewComponentService.findAll();
    const firstData = data[0];
    const fileName = 'WfViewComponent_template.xlsx';
    const result = {};
    Object.keys(firstData).forEach((key) => {
      result[key] = null;
    });
    return this.wfViewComponentService.exportExcel([result], res, fileName);
  }

  @Post('exportWfViewComponent')
  @ApiOperation({ summary: '导出组件' })
  async exportWfViewComponent(@Res() res: Response): Promise<void> {
    const fileName = 'WfViewComponent.xlsx';
    const data = await this.wfViewComponentService.findAll();
    return this.wfViewComponentService.exportExcel(data, res, fileName);
  }

  @Post('getWfViewComponent')
  @ApiOperation({ summary: '获取组件' })
  getWfViewComponent(@Query('viewViewComponentId') viewViewComponentId: string) {
    return this.wfViewComponentService.getItem(viewViewComponentId);
  }

  @Post('importWfViewComponent')
  @ApiOperation({ summary: '导入组件' })
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
  importWfViewComponent(@UploadedFile() file: Express.Multer.File) {
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

  @Post('insertWfViewComponent')
  @ApiOperation({ summary: '增加组件' })
  insertWfViewComponent(@Body() entity: WfViewComponent) {
    return this.wfViewComponentService.insert(entity);
  }

  @Post('insertWfViewComponentBatch')
  @ApiOperation({ summary: '增加组件(批量)' })
  insertWfViewComponentBatch(@Body() entity: WfViewComponent[]) {
    return this.wfViewComponentService.insertBatch(entity);
  }

  @Post('queryWfViewComponent')
  @ApiOperation({ summary: '查询组件列表结果' })
  queryWfViewComponent(@Body() condition:QueryDto) {
    return this.wfViewComponentService.queryList(condition)
  }

  @Post('saveWfViewComponent')
  @ApiOperation({ summary: '保存组件' })
  saveWfViewComponent(@Body() entity: WfViewComponent) {
    return this.wfViewComponentService.save(entity);
  }

  @Post('saveWfViewComponentBatch')
  @ApiOperation({ summary: '保存组件(批量)' })
  saveWfViewComponentBatch(@Body() entity: WfViewComponent[]) {
    return this.wfViewComponentService.saveBatch(entity);
  }

  @Post('updateWfViewComponent')
  @ApiOperation({ summary: '修改组件' })
  updateWfViewComponent(@Body() entity: WfViewComponent) {
    return this.wfViewComponentService.update(entity);
  }

  @Post('updateWfViewComponentBatch')
  @ApiOperation({ summary: '修改组件(批量)' })
  updateWfViewComponentBatch(@Body() entity: WfViewComponent[]) {
    return this.wfViewComponentService.updateBatch(entity);
  }
}
