import { ApiProperty } from "@nestjs/swagger"
import { FE_FRAMEWORK_TYPE } from "../framework";

export class Project {
  @ApiProperty({
    description:'接口前缀',
    required: false,
    default: 'sfBase',
  })
  readonly prefix: string

  @ApiProperty({
    description:'输出路径',
    required: true,
    default: './',
  })
  outputPath: string
}

export class ParamsDto {
  @ApiProperty({
    description:'项目信息',
    required: true,
  })
  projectInfo:Project
}

export class ProjectInfoDto {
  @ApiProperty({
    description: '前端仓库名称',
    required: true,
    default: 'monster-test',
  })
  readonly repoName: string;

  @ApiProperty({
    description: '项目框架类型',
    required: true,
    default: FE_FRAMEWORK_TYPE.TXSJ,
  })
  readonly frameworkType: string;

  @ApiProperty({
    description: '项目框架类型',
    required: true,
  })
  projectParma: ParamsDto;
}
