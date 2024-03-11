import { Column, Entity, PrimaryColumn, UpdateDateColumn, CreateDateColumn, DeleteDateColumn } from 'typeorm' ;
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class SfEnum{

  @ApiProperty({
    description: '枚举id'
  })
  @PrimaryColumn({
    name:'enum_id',
    comment: '主键'
  })
  enumId: string

  @ApiProperty({
    description: '枚举编码'
  })
  @Column({
    name:'enum_code',
    nullable: true,
    comment: '枚举编码'
  })
  enumCode: string

  @ApiProperty({
    description: '枚举名称'
  })
  @Column({
    name:'enum_name',
    nullable: false,
    comment: '枚举名称'
  })
  enumName: string

  @ApiProperty({
    description: '所属枚举类别'
  })
  @Column({
    name:'bind_enum_category',
    nullable: false,
    comment: '所属枚举类别'
  })
  bindEnumCategory: string

  @ApiProperty({
    description: '所属项目'
  })
  @Column({
    name:'bind_project',
    nullable: false,
    comment: '所属项目'
  })
  bindProject: string

  @ApiProperty({
    description: '是否同步数据'
  })
  @Column({
    name:'is_sync',
    nullable: true,
    comment: '是否同步数据'
  })
  isSync: number

  @ApiProperty({
    description: '枚举简称'
  })
  @Column({
    name:'short_name',
    nullable: true,
    comment: '枚举简称'
  })
  shortName: string

  @ApiProperty({
    description: '项目状态(0:关,1:开)'
  })
  @Column({
    name:'status',
    nullable: true,
    comment: '项目状态(0:关,1:开)'
  })
  status: string

  @ApiProperty({
    description: '备注'
  })
  @Column({
    name:'remark',
    nullable: true,
    comment: '备注'
  })
  remark: string

  @ApiProperty({
    description: '描述'
  })
  @Column({
    name:'description',
    nullable: true,
    comment: '描述'
  })
  description: string

  @ApiProperty({
    description: '排序'
  })
  @Column({
    name:'sort',
    nullable: true,
    comment: '排序'
  })
  sort: number

  @ApiProperty({
    description: '是否删除'
  })
  @Column({
    name:'isdel',
    nullable: true,
    comment: '是否删除'
  })
  isdel: string

  @ApiProperty({
    description: '创建人'
  })
  @Column({
    name:'creator',
    nullable: true,
    comment: '创建人'
  })
  creator: string

  @ApiProperty({
    description: '创建时间'
  })
  @Column({
    name:'create_time',
    nullable: true,
    comment: '创建时间'
  })
  createTime: string

  @ApiProperty({
    description: '修改人'
  })
  @Column({
    name:'updater',
    nullable: true,
    comment: '修改人'
  })
  updater: string

  @ApiProperty({
    description: '修改时间'
  })
  @Column({
    name:'update_time',
    nullable: true,
    comment: '修改时间'
  })
  updateTime: string

}
