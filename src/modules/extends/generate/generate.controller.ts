import { Body, Controller, Get, Post } from '@nestjs/common';
import { GenerateService } from './generate.service';
import {genServiceFe,genInterface} from './utils/index'
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParamsDto } from './dto/param.dto';
import { genCode } from './utils/common';
const path = require("path");
// import { nanoid } from 'nanoid';
const { nanoid }=  require('nanoid');

import { genPage } from './utils/genPage';
@ApiTags('gen') 
@Controller('generate')
export class GenerateController {
  constructor(private readonly generateService: GenerateService) {}
  @Get()
  findAll() {
    // return this.generateService.findAll();
  }

  // code,basePath,
  @Post('genBeCode')
  @ApiOperation({ summary: '后端接口代码生成' })
  async genBeCode(@Body() param:ParamsDto){
    return await genInterface(param)
  }

  @Post('getServiceFe')
  @ApiOperation({ summary: '获取前端services代码' })
  async getServiceFe(@Body() param:ParamsDto){
    const {projectInfo} = param
    return await genServiceFe(projectInfo)
  }

  @Get('getPages')
  @ApiOperation({ summary: '获取前端页面代码' })
  async getPages(){
    const id1 = nanoid()
    const id2 = nanoid()
    const id21 = nanoid()

    const funcList = [{
      id:id1,
      parent:null,
      code:'project',
      name:'项目',
      icon:'icon-xinjian-copy',
      menuType:'module',
    },{
      id:nanoid(),
      parent:id1,
      code:'xmjbxx',
      name:'项目基本信息',
      icon:'icon-xinjian-copy',
      menuType:'page',
    },{
      id:nanoid(),
      parent:id1,
      code:'jszbyq',
      name:'技术指标要求',
      icon:'icon-xinjian-copy',
      menuType:'page',
    },{
      id:id2,
      parent:null,
      code:'design',
      name:'设计',
      icon:'icon-xinjian-copy',
      menuType:'module',
    },{
      id:id21,
      parent:id2,
      code:'ztsj',
      name:'总体设计',
      icon:'icon-xinjian-copy',
      menuType:'module',
    },{
      id:nanoid(),
      parent:id21,
      code:'rjsjjuece',
      name:'软件设计决策',
      icon:'icon-xinjian-copy',
      menuType:'page',
    },{
      id:nanoid(),
      parent:id21,
      code:'xtywlc',
      name:'系统业务员流程',
      icon:'icon-xinjian-copy',
      menuType:'page',
    },{
      id:nanoid(),
      parent:id21,
      code:'jsjgsj',
      name:'技术架构设计',
      icon:'icon-xinjian-copy',
      menuType:'page',
    },{
      id:nanoid(),
      parent:id21,
      code:'xtjgsj',
      name:'系统架构设计',
      icon:'icon-xinjian-copy',
      menuType:'page',
    }]
    return await genPage(funcList)
  }

  @Post('genCode')
  @ApiOperation({ summary: '生成代码' })
  async genCode(@Body() param:ParamsDto){
    const {projectInfo} = param
    const {outputPath} = projectInfo
    // 获取services代码
    const serviceList = await this.getServiceFe(param)
    const getPages = await this.getPages()
    const list = [...serviceList,...getPages]
    // 拼写路径
    const fileList = list.map(item=>{
      return {
        ...item,
        filePath: path.resolve(outputPath, item.filePath)
      }
    })
    
    // 生成代码
    await genCode(fileList)

    return true
  }
}
