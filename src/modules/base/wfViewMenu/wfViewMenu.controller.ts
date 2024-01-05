import {
  Controller,
  Post,
  Body,
  Query,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { WfViewMenuService } from './wfViewMenu.service';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { WfViewMenu } from './wfViewMenu.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as xlsx from 'xlsx';
import { QueryDto } from '@/common/query.dto';

@ApiTags('菜单接口')
@Controller('/base/wfViewMenu')
export class WfViewMenuController {
  constructor(private readonly wfViewMenuService: WfViewMenuService) {}

  @Post('deleteWfViewMenuBatch')
  @ApiOperation({ summary: '删除菜单(批量、递归)' })
  deleteWfViewMenuBatch(@Body() viewMenuIdList: string[]) {
    return this.wfViewMenuService.deleteBatch(viewMenuIdList);
  }

  @Post('downloadWfViewMenuTemplate')
  @ApiOperation({ summary: '导出菜单模板下载' })
  async downloadWfViewMenuTemplate(@Res() res: Response): Promise<void> {
    const data = await this.wfViewMenuService.findAll();
    const firstData = data[0];
    const fileName = 'WfViewMenu_template.xlsx';
    const result = {};
    Object.keys(firstData).forEach((key) => {
      result[key] = null;
    });
    return this.wfViewMenuService.exportExcel([result], res, fileName);
  }

  @Post('exportWfViewMenu')
  @ApiOperation({ summary: '导出菜单' })
  async exportWfViewMenu(@Res() res: Response): Promise<void> {
    const fileName = 'WfViewMenu.xlsx';
    const data = await this.wfViewMenuService.findAll();
    return this.wfViewMenuService.exportExcel(data, res, fileName);
  }

  @Post('getWfViewMenu')
  @ApiOperation({ summary: '获取菜单' })
  getWfViewMenu(@Query('viewMenuId') viewMenuId: string) {
    return this.wfViewMenuService.getItem(viewMenuId);
  }

  @Post('importWfViewMenu')
  @ApiOperation({ summary: '导入菜单' })
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
  importWfViewMenu(@UploadedFile() file: Express.Multer.File) {
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

  @Post('insertWfViewMenu')
  @ApiOperation({ summary: '增加菜单' })
  insertWfViewMenu(@Body() entity: WfViewMenu) {
    return this.wfViewMenuService.insert(entity);
  }

  @Post('insertWfViewMenuBatch')
  @ApiOperation({ summary: '增加菜单(批量)' })
  insertWfViewMenuBatch(@Body() entity: WfViewMenu[]) {
    return this.wfViewMenuService.insertBatch(entity);
  }

  @Post('queryWfViewMenu')
  @ApiOperation({ summary: '查询菜单列表结果' })
  queryWfViewMenu(@Body() condition:QueryDto) {
    return this.wfViewMenuService.queryList(condition)
  }

  @Post('saveWfViewMenu')
  @ApiOperation({ summary: '保存菜单' })
  saveWfViewMenu(@Body() entity: WfViewMenu) {
    return this.wfViewMenuService.save(entity);
  }

  @Post('saveWfViewMenuBatch')
  @ApiOperation({ summary: '保存菜单(批量)' })
  saveWfViewMenuBatch(@Body() entity: WfViewMenu[]) {
    return this.wfViewMenuService.saveBatch(entity);
  }

  @Post('updateWfViewMenu')
  @ApiOperation({ summary: '修改菜单' })
  updateWfViewMenu(@Body() entity: WfViewMenu) {
    return this.wfViewMenuService.update(entity);
  }

  @Post('updateWfViewMenuBatch')
  @ApiOperation({ summary: '修改菜单(批量)' })
  updateWfViewMenuBatch(@Body() entity: WfViewMenu[]) {
    return this.wfViewMenuService.updateBatch(entity);
  }
}
