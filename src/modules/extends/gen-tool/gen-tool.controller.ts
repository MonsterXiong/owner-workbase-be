import { Body, Controller, Post } from '@nestjs/common';
import { GenToolService } from './gen-tool.service';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { quickGenAdapter } from '../../../../submodule/genCode-utils/src/tool/quickGenAdapter/quickGenAdapter';

class elementDto {
  @ApiProperty({
    description: '字段key rowInfo',
    required: true,
    default: '',
  })
  field: string;

  @ApiProperty({
    description: '要素名称 queryRow',
    required: true,
    default: '',
  })
  elementName: string;

  @ApiProperty({
    description: '要素信息 xx信息',
    required: true,
    default: '',
  })
  message: string;
}

class JsonData {
  @ApiProperty({
    description: '适配器类型',
    required: true,
    default: 'page',
  })
  type: string;

  @ApiProperty({
    description: '适配器标识名称',
    required: true,
    default: 'org',
  })
  name: string;

  @ApiProperty({
    description: '对应组件枚举 eg:matrix_general',
    required: true,
    default: 'org_general',
  })
  componentName: string;

  @ApiProperty({
    description: '入口后缀',
    required: true,
    default: 'OrgGraph',
  })
  entrySuffixName: string;

  @ApiProperty({
    description: '组件要素',
    default: [
      {
        field: 'queryInfo',
        elementName: 'queryList',
        message: '组织图信息',
      },
    ],
  })
  element: elementDto[];
}

@ApiTags('内部工具')
@Controller('gen-tool')
export class GenToolController {
  constructor(private readonly genToolService: GenToolService) {}
  @Post('getCodeByJson')
  @ApiOperation({ summary: '通过json获取代码生成内容' })
  async getCodeByJson(@Body() jsonData: JsonData) {
    return await quickGenAdapter(jsonData);
  }
}
