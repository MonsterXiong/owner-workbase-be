import { nanoid } from 'nanoid';
import { SfProject } from './../../base/sfProject/sfProject.entity';
import { Body, Controller, Post, Query } from '@nestjs/common';
import { SfProjectExtendService } from './sf-project-extend.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JsonData } from '../gen/gen.controller';

@ApiTags('扩展项目')
@Controller('sfProjectExtend')
export class SfProjectExtendController {
  constructor(private readonly sfProjectExtendService: SfProjectExtendService) { }

  @Post('getProjectDetail')
  @ApiOperation({ summary: '根据项目id获取项目配置' })
  async getProjectDetail(@Query('projectId') projectId: string) {
    return this.sfProjectExtendService.getProjectConfig(projectId)
  }
  @Post('getTableByProjectId')
  @ApiOperation({ summary: '根据项目id获取表结构' })
  async getTableByProjectId(@Query('projectId') projectId: string) {
    return this.sfProjectExtendService.getTableByProjectId(projectId)
  }
  @Post('getFieldByProjectId')
  @ApiOperation({ summary: '根据项目id和表名获取字段' })
  async getFieldByProjectId(@Query('projectId') projectId: string,@Query('tableName') tableName: string) {
    return this.sfProjectExtendService.getFieldByProjectId(projectId,tableName)
  }

  @Post('getProjectGenCodeJson')
  @ApiOperation({ summary: '根据项目id获取项目生成JSON' })
  async getProjectGenCodeJson(@Query('projectId') projectId: string) {
    return this.sfProjectExtendService.getProjectGenCodeJson(projectId)
  }

  @Post('saveProject')
  @ApiOperation({ summary: '新增项目' })
  async saveProject(@Body() entity: SfProject) {
    if (!entity.projectId) {
        entity.projectId = nanoid()
    }
    return this.sfProjectExtendService.saveProject(entity)
  }

  @Post('syncProjectToSf')
  @ApiOperation({ summary: '导入并同步项目' })
  async syncProjectToSf(@Query('projectId') projectId: string,@Body() jsonData: JsonData) {
    return this.sfProjectExtendService.syncProjectToSf(projectId,jsonData)
  }
}
