import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { GenService } from './gen.service';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { FRAMEWORK_CONFIG } from 'submodule/genCode-utils/src/config/frameworkConfig';
import { genCode } from 'submodule/genCode-utils/src/common';
import { downloadCodeFile, uncompress } from '../generate/fe/utils';
import { Response } from 'express';
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

@ApiTags('代码生成 api')
@Controller('gen')
export class GenController {
  constructor(private readonly genService: GenService) {}

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
}
