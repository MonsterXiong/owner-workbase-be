import {
  Controller,
  Post,
  Body,
  Query,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { SfMenuDetailService } from './sfMenuDetail.service';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { SfMenuDetail } from './sfMenuDetail.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as xlsx from 'xlsx';
import { QueryDto } from '../../../common/query.dto';
import { nanoid } from "nanoid";

@ApiTags('菜单详情接口')
@Controller('/sfBase/sfMenuDetail')
export class SfMenuDetailController {
  constructor(private readonly sfMenuDetailService: SfMenuDetailService) {}

  @Post('deleteSfMenuDetailBatch')
  @ApiOperation({ summary: '删除菜单详情(批量、递归)' })
  deleteSfMenuDetailBatch(@Body() menuDetailIdList: string[]) {
    return this.sfMenuDetailService.deleteBatch(menuDetailIdList);
  }

  @Post('downloadSfMenuDetailTemplate')
  @ApiOperation({ summary: '导出菜单详情模板下载' })
  async downloadSfMenuDetailTemplate(@Res() res: Response): Promise<void> {
    const data = await this.sfMenuDetailService.findAll();
    const firstData = data[0];
    const fileName = 'SfMenuDetail_template.xlsx';
    const result = {};
    Object.keys(firstData).forEach((key) => {
      result[key] = null;
    });
    return this.sfMenuDetailService.exportExcel([result], res, fileName);
  }

  @Post('exportSfMenuDetail')
  @ApiOperation({ summary: '导出菜单详情' })
  async exportSfMenuDetail(@Res() res: Response): Promise<void> {
    const fileName = 'SfMenuDetail.xlsx';
    const data = await this.sfMenuDetailService.findAll();
    return this.sfMenuDetailService.exportExcel(data, res, fileName);
  }

  @Post('getSfMenuDetail')
  @ApiOperation({ summary: '获取菜单详情' })
  getSfMenuDetail(@Query('menuDetailId') menuDetailId: string) {
    return this.sfMenuDetailService.getItem(menuDetailId);
  }

  @Post('importSfMenuDetail')
  @ApiOperation({ summary: '导入菜单详情' })
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
  importSfMenuDetail(@UploadedFile() file: Express.Multer.File) {
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

  @Post('insertSfMenuDetail')
  @ApiOperation({ summary: '增加菜单详情' })
  insertSfMenuDetail(@Body() entity: SfMenuDetail) {
    return this.sfMenuDetailService.insert(entity);
  }

  @Post('insertSfMenuDetailBatch')
  @ApiOperation({ summary: '增加菜单详情(批量)' })
  insertSfMenuDetailBatch(@Body() entity: SfMenuDetail[]) {
    return this.sfMenuDetailService.insertBatch(entity);
  }

  @Post('querySfMenuDetail')
  @ApiOperation({ summary: '查询菜单详情列表结果' })
  querySfMenuDetail(@Body() condition:QueryDto) {
    return this.sfMenuDetailService.queryList(condition)
  }

  @Post('saveSfMenuDetail')
  @ApiOperation({ summary: '保存菜单详情' })
  saveSfMenuDetail(@Body() entity: SfMenuDetail) {
    if(!entity.menuDetailId){
      entity.menuDetailId = nanoid()
    }
    return this.sfMenuDetailService.save(entity);
  }

  @Post('saveSfMenuDetailBatch')
  @ApiOperation({ summary: '保存菜单详情(批量)' })
  saveSfMenuDetailBatch(@Body() entity: SfMenuDetail[]) {
    entity.forEach(entityItem=>{
      if(!entityItem.menuDetailId){
        entityItem.menuDetailId = nanoid()
      }
    })
    return this.sfMenuDetailService.saveBatch(entity);
  }

  @Post('updateSfMenuDetail')
  @ApiOperation({ summary: '修改菜单详情' })
  updateSfMenuDetail(@Body() entity: SfMenuDetail) {
    return this.sfMenuDetailService.update(entity);
  }

  @Post('updateSfMenuDetailBatch')
  @ApiOperation({ summary: '修改菜单详情(批量)' })
  updateSfMenuDetailBatch(@Body() entity: SfMenuDetail[]) {
    return this.sfMenuDetailService.updateBatch(entity);
  }
}
