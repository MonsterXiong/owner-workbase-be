import { SfProjectExtendService } from './../sf-project-extend/sf-project-extend.service';
import { Body, Controller, Get, Param, Post, Query, Req, Res } from '@nestjs/common';
import { GenService } from './gen.service';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { FRAMEWORK_CONFIG } from '../../../../submodule/genCode-utils/src/config/frameworkConfig';
import { genCode } from '../../../../submodule/genCode-utils/src/common';
import { downloadCodeFile, uncompress } from '../generate/fe/utils';
import { Response } from 'express';
import * as path from 'path';
import { parseSfJson } from './sf/parseSfJson';
const fse = require('fs-extra');

export class JsonData{

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
      if (item.filePath.indexOf('pages') > 0) {
        // 无关前缀都去除掉
        let sliceLength = 'pages/'.length
        const pageDirLength = item.filePath.slice(sliceLength).indexOf('/')
        if (pageDirLength !== -1) {
          sliceLength +=pageDirLength+1
        }
        filePath = path.join(projectPath,item.filePath?.slice(sliceLength))
      } else {
        filePath = path.join(projectPath,item.filePath?.replace('pages/',''))
      }
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
  // BUG:不应该在这里格式化，还存在service、enum代码
  codeList = formatPageCode(codeData,projectPath,isProject)
  // 生成代码
  await genCode(codeList);
}


function getProjectPath(outputDir="") {
  return outputDir || FRAMEWORK_CONFIG.CODE_OUTPUT_ROOT_PATH
}

async function outputCode(res, codeData, isProject = true) {
  const projectPath = getProjectPath()
  await writeCode(projectPath,codeData,isProject)
  return await downloadCodeFile(projectPath,res)
}

@ApiTags('代码生成 api')
@Controller('gen')
export class GenController {
  constructor(
    private readonly genService: GenService,
    private readonly sfProjectExtendService: SfProjectExtendService,
  ) {}

  // @Post('getCodeByJson')
  // @ApiOperation({ summary: '通过json获取代码生成内容' })
  // async getCodeByJson(@Body() jsonData:JsonData){
  //   return await this.genService.getGenCode(jsonData)
  // }

  // @Post('genCode')
  // @ApiOperation({ summary: '通过json直接生成代码' })
  // async genCode(@Body() jsonData:JsonData){
  //   try {
  //     const codeList = await this.genService.getGenCode(jsonData)
  //     try {
  //       await genCode(codeList);
  //       return '操作成功'
  //     } catch (error) {
  //       console.log('代码输出错误');
  //     }
  //   } catch (error) {
  //     console.log(error, '生成代码错误');
  //   }
  // }

  // @Post('genProject')
  // @ApiOperation({ summary: '通过json直接生成代码-----软件工厂需要调用(旧)' })
  // async genProject(@Body() jsonData:JsonData,@Res() res:Response){
  //   try {
  //     const { projectInfo } = jsonData;
  //     const { projectOutputDir } = projectInfo
  //     const projectPath = getProjectPath(projectOutputDir)
  //     const codeList = await this.genService.getGenCode(jsonData)
  //     // 确保项目路径存在
  //     fse.ensureDirSync(projectPath);
  //     // 解压项目框架模板
  //     await uncompress('public/txsj-fe-template-master.zip',projectPath)
  //     // 生成代码
  //     await genCode(codeList);
  //     return await downloadCodeFile(projectPath,res)
  //   } catch (error) {
  //     console.log(error, 'error');
  //   }
  // }

  @Post('genProject')
  @ApiOperation({ summary: '通过json直接生成代码-----软件工厂需要调用xxx' })
  async genProject(@Body() jsonData: JsonData, @Res() res: Response) {
    const toolJsonData =await parseSfJson(jsonData)
    // return true
    return outputCode(res,toolJsonData)
  }

  // 之前
  @Post('genProject1')
  @ApiOperation({ summary: '通过json直接生成代码-----软件工厂需要调用xxx' })
  async genProject1(@Body() jsonData: JsonData, @Res() res: Response) {
    const toolJsonData = await this.sfProjectExtendService.adapterJson(jsonData)
    const codeData = await this.genService.getSfGenCode(toolJsonData)
    return outputCode(res,codeData)
  }


  @Post('genSfProjectByProjectId')
  @ApiOperation({ summary: '通过项目id直接生成代码--工具' })
  async genSfProjectByProjectId(@Query('projectId') projectId: string,@Res() res:Response){
    try {
      const jsonData = await this.sfProjectExtendService.getProjectGenCodeJson(projectId)
      console.log('jsonData',jsonData);

      const codeData = await this.genService.getSfGenCode(jsonData)
      return outputCode(res,codeData)
    } catch (error) {
      console.log(error, 'error');
    }
  }

  @Post('genSfServiceByProjectId')
  @ApiOperation({ summary: '通过项目id直接生成Service代码--工具' })
  async genSfServiceByProjectId(@Query('projectId') projectId: string,@Res() res:Response){
    const result = await this.genService.getSfServiceByProjectId(projectId)
    return outputCode(res,result,false)
  }

  @Post('getSfServiceByProjectId')
  @ApiOperation({ summary: '通过项目id获取Service代码' })
  async getSfServiceByProjectId(@Query('projectId') projectId: string) {
    return await this.genService.getSfServiceByProjectId(projectId)
  }

  @Post('genSfEnumByProjectId')
  @ApiOperation({ summary: '通过项目id直接生成Enum代码--工具' })
  async genSfEnumByProjectId(@Query('projectId') projectId: string,@Res() res:Response){
    const result = await this.genService.getSfEnumCodeByProjectId(projectId)
    return outputCode(res,result,false)
  }

  @Post('getSfEnumByProjectId')
  @ApiOperation({ summary: '通过项目id获取Enum代码' })
  async getSfEnumByProjectId(@Query('projectId') projectId: string){
    return this.genService.getSfEnumCodeByProjectId(projectId)
  }

  @Post('downloadSfPageCodeByMenuId')
  @ApiOperation({ summary: '通过菜单id直接下载代码--工具' })
  async downloadSfPageCodeByMenuId(@Query('menuId') menuId: string,@Res() res:Response){
    const result = await this.genService.getSfPageCode(menuId)
    return outputCode(res,result,false)
  }

  @Post('genSfPageCodeByMenuId')
  @ApiOperation({ summary: '通过菜单id查看生成代码内容-工具' })
  async genSfPageCodeByMenuId(@Query('menuId') menuId: string){
    const codeData = await this.genService.getSfPageCode(menuId)
    return formatPageCode(codeData, '', false)
  }
  @Post('getMenuCodeByMenuId')
  @ApiOperation({ summary: '通过菜单id查看菜单相关路由代码内容' })
  async getMenuCodeByMenuId(@Query('menuId') menuId: string){
    return this.genService.getMenuCodeByMenuId(menuId)
  }
  @Post('genMenuCodeByMenuId')
  @ApiOperation({ summary: '通过菜单id查看菜单相关路由代码内容' })
  async genMenuCodeByMenuId(@Query('menuId') menuId: string,@Res() res:Response){
    const result = await this.genService.getMenuCodeByMenuId(menuId)
    return outputCode(res,result,false)
  }
}
