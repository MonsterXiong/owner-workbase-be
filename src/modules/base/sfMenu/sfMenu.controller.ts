import {
  Controller,
  Post,
  Body,
  Query,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { SfMenuService } from './sfMenu.service';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { SfMenu } from './sfMenu.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as xlsx from 'xlsx';
import { QueryDto } from '../../../common/query.dto';
import { nanoid } from "nanoid";

@ApiTags('菜单接口')
@Controller('/sfBase/sfMenu')
export class SfMenuController {
  constructor(private readonly sfMenuService: SfMenuService) {}

  @Post('deleteSfMenuBatch')
  @ApiOperation({ summary: '删除菜单(批量、递归)' })
  deleteSfMenuBatch(@Body() menuIdList: string[]) {
    return this.sfMenuService.deleteBatch(menuIdList);
  }

  @Post('downloadSfMenuTemplate')
  @ApiOperation({ summary: '导出菜单模板下载' })
  async downloadSfMenuTemplate(@Res() res: Response): Promise<void> {
    const data = await this.sfMenuService.findAll();
    const firstData = data[0];
    const fileName = 'SfMenu_template.xlsx';
    const result = {};
    Object.keys(firstData).forEach((key) => {
      result[key] = null;
    });
    return this.sfMenuService.exportExcel([result], res, fileName);
  }

  @Post('exportSfMenu')
  @ApiOperation({ summary: '导出菜单' })
  async exportSfMenu(@Res() res: Response): Promise<void> {
    const fileName = 'SfMenu.xlsx';
    const data = await this.sfMenuService.findAll();
    return this.sfMenuService.exportExcel(data, res, fileName);
  }

  @Post('getSfMenu')
  @ApiOperation({ summary: '获取菜单' })
  getSfMenu(@Query('menuId') menuId: string) {
    return this.sfMenuService.getItem(menuId);
  }

  @Post('importSfMenu')
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
  importSfMenu(@UploadedFile() file: Express.Multer.File) {
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

  @Post('insertSfMenu')
  @ApiOperation({ summary: '增加菜单' })
  insertSfMenu(@Body() entity: SfMenu) {
    return this.sfMenuService.insert(entity);
  }

  @Post('insertSfMenuBatch')
  @ApiOperation({ summary: '增加菜单(批量)' })
  insertSfMenuBatch(@Body() entity: SfMenu[]) {
    return this.sfMenuService.insertBatch(entity);
  }

  @Post('querySfMenu')
  @ApiOperation({ summary: '查询菜单列表结果' })
  querySfMenu(@Body() condition:QueryDto) {
    return this.sfMenuService.queryList(condition)
  }

  @Post('saveSfMenu')
  @ApiOperation({ summary: '保存菜单' })
  saveSfMenu(@Body() entity: SfMenu) {
    if(!entity.menuId){
      entity.menuId = nanoid()
    }
    return this.sfMenuService.save(entity);
  }

  @Post('saveSfMenuBatch')
  @ApiOperation({ summary: '保存菜单(批量)' })
  saveSfMenuBatch(@Body() entity: SfMenu[]) {
    entity.forEach(entityItem=>{
      if(!entityItem.menuId){
        entityItem.menuId = nanoid()
      }
    })
    return this.sfMenuService.saveBatch(entity);
  }

  @Post('updateSfMenu')
  @ApiOperation({ summary: '修改菜单' })
  updateSfMenu(@Body() entity: SfMenu) {
    return this.sfMenuService.update(entity);
  }

  @Post('updateSfMenuBatch')
  @ApiOperation({ summary: '修改菜单(批量)' })
  updateSfMenuBatch(@Body() entity: SfMenu[]) {
    return this.sfMenuService.updateBatch(entity);
  }
}
