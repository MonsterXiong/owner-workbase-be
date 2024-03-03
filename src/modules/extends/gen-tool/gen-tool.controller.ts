import { Body, Controller, Post } from '@nestjs/common';
import { GenToolService } from './gen-tool.service';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { quickGenAdapter } from 'submodule/genCode-utils/src/tool/quickGenAdapter/quickGenAdapter';
import { quickGenCategoryType, quickGenComponentTemplate } from 'submodule/genCode-utils/src/tool/quickGenComponentTemplate/quickGenComponentTemplate';

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

class componentDto {
  @ApiProperty({
    description: '组件标识',
    required: true,
    default: '',
  })
  name: string;

  @ApiProperty({
    description: '组件模板',
    required: false,
    default: `<template>\n    <div>\${name}</div>\n</template>`,
  })
  componentTemplate: string;
}

class adapterDto {
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

  // 子组件页面
  @ApiProperty({
    description: '子组件配置',
    default: [],
  })
  subComponent:componentDto[]
}

class genCategoryTypeDto{
  @ApiProperty({
    description: '名称',
    required: true,
  })
  name: string;

  @ApiProperty({
    description: '标识',
    required: true,
  })
  code: string;
}

class genComponentTemplateDto extends genCategoryTypeDto{
  @ApiProperty({
    description: '所属类别',
    required: true,
  })
  categoryType: string;
}

@ApiTags('内部工具')
@Controller('gen-tool')
export class GenToolController {
  constructor(private readonly genToolService: GenToolService) {}
  @Post('quickGenAdapter')
  @ApiOperation({ summary: '通过json获取代码生成内容' })
  async genAdapter(@Body() jsonData: adapterDto) {
    return await quickGenAdapter(jsonData);
  }

  @Post('quickGenComponentTemplate')
  @ApiOperation({ summary: '快速生成组件模板架子' })
  async genComponentTemplate(@Body() jsonData: genComponentTemplateDto) {
    return await quickGenComponentTemplate(jsonData);
  }
  @Post('quickGenCategoryType')
  @ApiOperation({ summary: '快速生成组件模板类别' })
  async genCategoryType(@Body() jsonData: genCategoryTypeDto) {
    return await quickGenCategoryType(jsonData);
  }
}
