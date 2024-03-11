import {
  Controller,
  Post,
  Body,
  Query,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { SfEnumService } from './sfEnum.service';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { SfEnum } from './sfEnum.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as xlsx from 'xlsx';
import { QueryDto } from '../../../common/query.dto';
import { nanoid } from "nanoid";

@ApiTags('枚举接口')
@Controller('/sfBase/sfEnum')
export class SfEnumController {
  constructor(private readonly sfEnumService: SfEnumService) {}

  @Post('deleteSfEnumBatch')
  @ApiOperation({ summary: '删除枚举(批量、递归)' })
  deleteSfEnumBatch(@Body() enumIdList: string[]) {
    return this.sfEnumService.deleteBatch(enumIdList);
  }

  @Post('downloadSfEnumTemplate')
  @ApiOperation({ summary: '导出枚举模板下载' })
  async downloadSfEnumTemplate(@Res() res: Response): Promise<void> {
    const data = await this.sfEnumService.findAll();
    const firstData = data[0];
    const fileName = 'SfEnum_template.xlsx';
    const result = {};
    Object.keys(firstData).forEach((key) => {
      result[key] = null;
    });
    return this.sfEnumService.exportExcel([result], res, fileName);
  }

  @Post('exportSfEnum')
  @ApiOperation({ summary: '导出枚举' })
  async exportSfEnum(@Res() res: Response): Promise<void> {
    const fileName = 'SfEnum.xlsx';
    const data = await this.sfEnumService.findAll();
    return this.sfEnumService.exportExcel(data, res, fileName);
  }

  @Post('getSfEnum')
  @ApiOperation({ summary: '获取枚举' })
  getSfEnum(@Query('enumId') enumId: string) {
    return this.sfEnumService.getItem(enumId);
  }

  @Post('importSfEnum')
  @ApiOperation({ summary: '导入枚举' })
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
  importSfEnum(@UploadedFile() file: Express.Multer.File) {
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

  @Post('insertSfEnum')
  @ApiOperation({ summary: '增加枚举' })
  insertSfEnum(@Body() entity: SfEnum) {
    return this.sfEnumService.insert(entity);
  }

  @Post('insertSfEnumBatch')
  @ApiOperation({ summary: '增加枚举(批量)' })
  insertSfEnumBatch(@Body() entity: SfEnum[]) {
    return this.sfEnumService.insertBatch(entity);
  }

  @Post('querySfEnum')
  @ApiOperation({ summary: '查询枚举列表结果' })
  querySfEnum(@Body() condition:QueryDto) {
    return this.sfEnumService.queryList(condition)
  }

  @Post('saveSfEnum')
  @ApiOperation({ summary: '保存枚举' })
  saveSfEnum(@Body() entity: SfEnum) {
    if(!entity.enumId){
      entity.enumId = nanoid()
    }
    return this.sfEnumService.save(entity);
  }

  @Post('saveSfEnumBatch')
  @ApiOperation({ summary: '保存枚举(批量)' })
  saveSfEnumBatch(@Body() entity: SfEnum[]) {
    entity.forEach(entityItem=>{
      if(!entityItem.enumId){
        entityItem.enumId = nanoid()
      }
    })
    return this.sfEnumService.saveBatch(entity);
  }

  @Post('updateSfEnum')
  @ApiOperation({ summary: '修改枚举' })
  updateSfEnum(@Body() entity: SfEnum) {
    return this.sfEnumService.update(entity);
  }

  @Post('updateSfEnumBatch')
  @ApiOperation({ summary: '修改枚举(批量)' })
  updateSfEnumBatch(@Body() entity: SfEnum[]) {
    return this.sfEnumService.updateBatch(entity);
  }
}
