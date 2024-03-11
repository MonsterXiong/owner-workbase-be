import {
  Controller,
  Post,
  Body,
  Query,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { SfEnumCategoryService } from './sfEnumCategory.service';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { SfEnumCategory } from './sfEnumCategory.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as xlsx from 'xlsx';
import { QueryDto } from '../../../common/query.dto';
import { nanoid } from "nanoid";

@ApiTags('枚举类别接口')
@Controller('/sfBase/sfEnumCategory')
export class SfEnumCategoryController {
  constructor(private readonly sfEnumCategoryService: SfEnumCategoryService) {}

  @Post('deleteSfEnumCategoryBatch')
  @ApiOperation({ summary: '删除枚举类别(批量、递归)' })
  deleteSfEnumCategoryBatch(@Body() enumCategoryIdList: string[]) {
    return this.sfEnumCategoryService.deleteBatch(enumCategoryIdList);
  }

  @Post('downloadSfEnumCategoryTemplate')
  @ApiOperation({ summary: '导出枚举类别模板下载' })
  async downloadSfEnumCategoryTemplate(@Res() res: Response): Promise<void> {
    const data = await this.sfEnumCategoryService.findAll();
    const firstData = data[0];
    const fileName = 'SfEnumCategory_template.xlsx';
    const result = {};
    Object.keys(firstData).forEach((key) => {
      result[key] = null;
    });
    return this.sfEnumCategoryService.exportExcel([result], res, fileName);
  }

  @Post('exportSfEnumCategory')
  @ApiOperation({ summary: '导出枚举类别' })
  async exportSfEnumCategory(@Res() res: Response): Promise<void> {
    const fileName = 'SfEnumCategory.xlsx';
    const data = await this.sfEnumCategoryService.findAll();
    return this.sfEnumCategoryService.exportExcel(data, res, fileName);
  }

  @Post('getSfEnumCategory')
  @ApiOperation({ summary: '获取枚举类别' })
  getSfEnumCategory(@Query('enumCategoryId') enumCategoryId: string) {
    return this.sfEnumCategoryService.getItem(enumCategoryId);
  }

  @Post('importSfEnumCategory')
  @ApiOperation({ summary: '导入枚举类别' })
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
  importSfEnumCategory(@UploadedFile() file: Express.Multer.File) {
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

  @Post('insertSfEnumCategory')
  @ApiOperation({ summary: '增加枚举类别' })
  insertSfEnumCategory(@Body() entity: SfEnumCategory) {
    return this.sfEnumCategoryService.insert(entity);
  }

  @Post('insertSfEnumCategoryBatch')
  @ApiOperation({ summary: '增加枚举类别(批量)' })
  insertSfEnumCategoryBatch(@Body() entity: SfEnumCategory[]) {
    return this.sfEnumCategoryService.insertBatch(entity);
  }

  @Post('querySfEnumCategory')
  @ApiOperation({ summary: '查询枚举类别列表结果' })
  querySfEnumCategory(@Body() condition:QueryDto) {
    return this.sfEnumCategoryService.queryList(condition)
  }

  @Post('saveSfEnumCategory')
  @ApiOperation({ summary: '保存枚举类别' })
  saveSfEnumCategory(@Body() entity: SfEnumCategory) {
    if(!entity.enumCategoryId){
      entity.enumCategoryId = nanoid()
    }
    return this.sfEnumCategoryService.save(entity);
  }

  @Post('saveSfEnumCategoryBatch')
  @ApiOperation({ summary: '保存枚举类别(批量)' })
  saveSfEnumCategoryBatch(@Body() entity: SfEnumCategory[]) {
    entity.forEach(entityItem=>{
      if(!entityItem.enumCategoryId){
        entityItem.enumCategoryId = nanoid()
      }
    })
    return this.sfEnumCategoryService.saveBatch(entity);
  }

  @Post('updateSfEnumCategory')
  @ApiOperation({ summary: '修改枚举类别' })
  updateSfEnumCategory(@Body() entity: SfEnumCategory) {
    return this.sfEnumCategoryService.update(entity);
  }

  @Post('updateSfEnumCategoryBatch')
  @ApiOperation({ summary: '修改枚举类别(批量)' })
  updateSfEnumCategoryBatch(@Body() entity: SfEnumCategory[]) {
    return this.sfEnumCategoryService.updateBatch(entity);
  }
}
