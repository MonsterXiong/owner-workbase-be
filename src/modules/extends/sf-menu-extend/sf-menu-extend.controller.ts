import { Controller, Post, Query } from '@nestjs/common';
import { SfMenuExtendService } from './sf-menu-extend.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('扩展菜单')
@Controller('sfMenuExtend')
export class SfMenuExtendController {
  constructor(private readonly sfMenuExtendService: SfMenuExtendService) { }

  @Post('getMenuInfoById')
  @ApiOperation({ summary: '根据菜单id获取菜单信息和菜单详情' })
  async getMenuInfoById(@Query('menuId') menuId: string) {
    return this.sfMenuExtendService.getMenuInfoById(menuId)
  }
}
