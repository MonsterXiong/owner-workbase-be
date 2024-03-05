import { nanoid } from 'nanoid';
import { SfProject } from './../../base/sfProject/sfProject.entity';
import { Body, Controller, Post, Query } from '@nestjs/common';
import { SfProjectExtendService } from './sf-project-extend.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('扩展项目')
@Controller('sfProjectExtend')
export class SfProjectExtendController {
  constructor(private readonly sfProjectExtendService: SfProjectExtendService,
  ) { }

  @Post('getProjectDetail')
  @ApiOperation({ summary: '根据项目id获取项目配置' })
  async getProjectDetail(@Query('projectId') projectId: string) {
    return this.sfProjectExtendService.getProjectConfig(projectId)
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
}
