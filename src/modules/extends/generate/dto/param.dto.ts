import { ApiProperty } from "@nestjs/swagger"

export class Project {
  @ApiProperty({
    description:'接口前缀',
    required: false,
    default: 'base',
  })
  readonly prefix: string

  @ApiProperty({
    description:'输出路径',
    required: true,
  })
  readonly outputPath: string
}

export class ParamsDto {
  @ApiProperty({
    description:'项目信息',
    required: true,
    default: {
			"prefix": "base",
      "outputPath":""
    },
  })
  readonly projectInfo:Project
}
