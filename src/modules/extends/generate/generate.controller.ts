import { Body, Controller, Get, Post } from '@nestjs/common';
import { GenerateService } from './generate.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParamsDto } from './dto/param.dto';
import { genCode } from './utils/common';

import {funcList} from '../../../mock/funcList'
const path = require('path');

@ApiTags('gen')
@Controller('generate')
export class GenerateController {
  constructor(private readonly generateService: GenerateService) {}

  @Post('genBeCode')
  @ApiOperation({ summary: '用于生成后端接口代码' })
  async genBeCode(@Body() param: ParamsDto) {
      const fileList = await this.generateService.getInterface(param)
      return await genCode(fileList);
  }

  @Post('getServiceFe')
  @ApiOperation({ summary: '获取前端services代码' })
  async getServiceFe(@Body() param: ParamsDto) {
    return await this.generateService.getServiceFe(param)
  }

  @Get('getPages')
  @ApiOperation({ summary: '获取前端页面代码，包含菜单，路由和页面' })
  async getPages() {
    // 功能组成模型的基础代码
    return await this.generateService.getPage(funcList);
  }

  @Post('genCode')
  @ApiOperation({ summary: '生成代码' })
  async genCode(@Body() param: ParamsDto) {
    const fileList =  await this.generateService.genCode(param);
    // 生成代码
    await genCode(fileList);

    return true;
  }
}
