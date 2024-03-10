import { SfProjectExtendService } from './../sf-project-extend/sf-project-extend.service';
import { Body, Controller, Get, Param, Post, Query, Req, Res } from '@nestjs/common';
import { GenService } from './gen.service';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { FRAMEWORK_CONFIG } from '../../../../submodule/genCode-utils/src/config/frameworkConfig';
import { genCode } from '../../../../submodule/genCode-utils/src/common';
import { downloadCodeFile, uncompress } from '../generate/fe/utils';
import { Response } from 'express';
import { genContentByType, genPageCode, genServiceCode } from './genCodeUtil';
import * as path from 'path';
import { SfMenuExtendService } from '../sf-menu-extend/sf-menu-extend.service';
const fse = require('fs-extra');

class JsonData{

  @ApiProperty({
    description: 'json',
  })
  projectInfo:any

  @ApiProperty({
    description: 'json',
  })
  menuInfo:any

  @ApiProperty({
    description: 'json',
  })
  dataInfo:Object

  @ApiProperty({
    description: 'json',
  })
  componentInfo:Object
}
class SfJsonData{

  @ApiProperty({
    description: 'json',
  })
  projectInfo:any

  @ApiProperty({
    description: 'json',
  })
  menuList:any

  @ApiProperty({
    description: 'json',
  })
  routesConstantList:any

  @ApiProperty({
    description: 'json',
  })
  routeList: any

  @ApiProperty({
    description: 'json',
  })
  pageList: any

  @ApiProperty({
    description: 'json',
  })
  serviceList:any
}

function formatPageCode(codeData,projectPath='./',isProject=true) {
  let codeList = codeData
  if(!Array.isArray(codeData)){
    codeList = [codeData]
  }
  return codeList.map(item => {
    let filePath = item.filePath
    if (isProject) {
      filePath = path.join(projectPath,'src',item.filePath)
    } else {
      filePath = path.join(projectPath,item.filePath?.replace('pages/',''))
    }
    return {
      ...item,
      filePath
    }
  })
}

async function writeCode(projectPath,codeData,isProject = true) {
  // 确保项目路径存在
  fse.ensureDirSync(projectPath);
  let codeList = []
  // 解压项目框架模板
  if (isProject) {
    await uncompress('public/txsj-fe-template-master.zip', projectPath)
  }
  codeList = formatPageCode(codeData,projectPath,isProject)
  // 生成代码
  await genCode(codeList);
}

@ApiTags('代码生成 api')
@Controller('gen')
export class GenController {
  constructor(private readonly genService: GenService,
    private readonly sfProjectExtendService: SfProjectExtendService,
  ) { }

  @Post('getCodeByJson')
  @ApiOperation({ summary: '通过json获取代码生成内容' })
  async getCodeByJson(@Body() jsonData:JsonData){
    return await this.genService.getGenCode(jsonData)
  }

  @Post('genCode')
  @ApiOperation({ summary: '通过json直接生成代码' })
  async genCode(@Body() jsonData:JsonData){
    try {
      const codeList = await this.genService.getGenCode(jsonData)
      try {
        await genCode(codeList);
        return '操作成功'
      } catch (error) {
        console.log(error, '代码输出错误');
      }
    } catch (error) {
      console.log(error, 'error');
    }
  }

  @Post('genProject')
  @ApiOperation({ summary: '通过json直接生成代码' })
  async genProject(@Body() jsonData:JsonData,@Res() res:Response){
    try {
      const { projectInfo } = jsonData;
      const { projectOutputDir } = projectInfo
      const projectPath = projectOutputDir || FRAMEWORK_CONFIG.CODE_OUTPUT_ROOT_PATH
      const codeList = await this.genService.getGenCode(jsonData)
      // 确保项目路径存在
      fse.ensureDirSync(projectPath);
      // 解压项目框架模板
      await uncompress('public/txsj-fe-template-master.zip',projectPath)
      // 生成代码
      await genCode(codeList);
      return await downloadCodeFile(projectPath,res)
    } catch (error) {
      console.log(error, 'error');
    }
  }


  @Post('genSfProjectByProjectId')
  @ApiOperation({ summary: '通过项目id直接生成代码--勿用' })
  async genSfProjectByProjectId(@Query('projectId') projectId: string,@Res() res:Response){
    try {

      const projectOutputDir = ''
      const projectPath = projectOutputDir || FRAMEWORK_CONFIG.CODE_OUTPUT_ROOT_PATH

      const jsonData = await this.sfProjectExtendService.getProjectGenCodeJson(projectId)

      const codeData = await this.genService.getSfGenCode(jsonData)

      await writeCode(projectPath,codeData)
      return await downloadCodeFile(projectPath,res)
    } catch (error) {
      console.log(error, 'error');
    }
  }

  @Post('downloadSfPageCodeByMenuId')
  @ApiOperation({ summary: '通过菜单id直接下载代码--勿用' })
  async downloadSfPageCodeByMenuId(@Query('menuId') menuId: string,@Res() res:Response){
    try {
      const projectOutputDir = ''
      const projectPath = projectOutputDir || FRAMEWORK_CONFIG.CODE_OUTPUT_ROOT_PATH

      const codeData = await this.genService.getSfPageCode(menuId)

      await writeCode(projectPath,codeData,false)
      return await downloadCodeFile(projectPath,res)
    } catch (error) {
      console.log(error, 'error');
    }
  }

  @Post('genSfPageCodeByMenuId')
  @ApiOperation({ summary: '通过菜单id查看生成代码内容' })
  async genSfPageCodeByMenuId(@Query('menuId') menuId: string){
    try {
      const codeData = await this.genService.getSfPageCode(menuId)
      console.log('codeData',codeData);

      return formatPageCode(codeData, '', false)
    } catch (error) {
      console.log(error, 'error');
    }
  }
}
