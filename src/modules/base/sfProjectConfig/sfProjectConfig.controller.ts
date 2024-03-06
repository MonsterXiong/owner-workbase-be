import {
  Controller,
  Post,
  Body,
  Query,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { SfProjectConfigService } from './sfProjectConfig.service';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { SfProjectConfig } from './sfProjectConfig.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as xlsx from 'xlsx';
import { QueryDto } from '../../../common/query.dto';
import { nanoid } from "nanoid";

@ApiTags('项目配置接口')
@Controller('/sfBase/sfProjectConfig')
export class SfProjectConfigController {
  constructor(private readonly sfProjectConfigService: SfProjectConfigService) {}

  @Post('deleteSfProjectConfigBatch')
  @ApiOperation({ summary: '删除项目配置(批量、递归)' })
  deleteSfProjectConfigBatch(@Body() projectConfigIdList: string[]) {
    return this.sfProjectConfigService.deleteBatch(projectConfigIdList);
  }

  @Post('downloadSfProjectConfigTemplate')
  @ApiOperation({ summary: '导出项目配置模板下载' })
  async downloadSfProjectConfigTemplate(@Res() res: Response): Promise<void> {
    const data = await this.sfProjectConfigService.findAll();
    const firstData = data[0];
    const fileName = 'SfProjectConfig_template.xlsx';
    const result = {};
    Object.keys(firstData).forEach((key) => {
      result[key] = null;
    });
    return this.sfProjectConfigService.exportExcel([result], res, fileName);
  }

  @Post('exportSfProjectConfig')
  @ApiOperation({ summary: '导出项目配置' })
  async exportSfProjectConfig(@Res() res: Response): Promise<void> {
    const fileName = 'SfProjectConfig.xlsx';
    const data = await this.sfProjectConfigService.findAll();
    return this.sfProjectConfigService.exportExcel(data, res, fileName);
  }

  @Post('getSfProjectConfig')
  @ApiOperation({ summary: '获取项目配置' })
  getSfProjectConfig(@Query('projectConfigId') projectConfigId: string) {
    return this.sfProjectConfigService.getItem(projectConfigId);
  }

  @Post('importSfProjectConfig')
  @ApiOperation({ summary: '导入项目配置' })
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
  importSfProjectConfig(@UploadedFile() file: Express.Multer.File) {
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

  @Post('insertSfProjectConfig')
  @ApiOperation({ summary: '增加项目配置' })
  insertSfProjectConfig(@Body() entity: SfProjectConfig) {
    return this.sfProjectConfigService.insert(entity);
  }

  @Post('insertSfProjectConfigBatch')
  @ApiOperation({ summary: '增加项目配置(批量)' })
  insertSfProjectConfigBatch(@Body() entity: SfProjectConfig[]) {
    return this.sfProjectConfigService.insertBatch(entity);
  }

  @Post('querySfProjectConfig')
  @ApiOperation({ summary: '查询项目配置列表结果' })
  querySfProjectConfig(@Body() condition:QueryDto) {
    return this.sfProjectConfigService.queryList(condition)
  }

  @Post('saveSfProjectConfig')
  @ApiOperation({ summary: '保存项目配置' })
  saveSfProjectConfig(@Body() entity: SfProjectConfig) {
    if(!entity.projectConfigId){
      entity.projectConfigId = nanoid()
    }
    return this.sfProjectConfigService.save(entity);
  }

  @Post('saveSfProjectConfigBatch')
  @ApiOperation({ summary: '保存项目配置(批量)' })
  saveSfProjectConfigBatch(@Body() entity: SfProjectConfig[]) {
    entity.forEach(entityItem=>{
      if(!entityItem.projectConfigId){
        entityItem.projectConfigId = nanoid()
      }
    })
    return this.sfProjectConfigService.saveBatch(entity);
  }

  @Post('updateSfProjectConfig')
  @ApiOperation({ summary: '修改项目配置' })
  updateSfProjectConfig(@Body() entity: SfProjectConfig) {
    return this.sfProjectConfigService.update(entity);
  }

  @Post('updateSfProjectConfigBatch')
  @ApiOperation({ summary: '修改项目配置(批量)' })
  updateSfProjectConfigBatch(@Body() entity: SfProjectConfig[]) {
    return this.sfProjectConfigService.updateBatch(entity);
  }
}
