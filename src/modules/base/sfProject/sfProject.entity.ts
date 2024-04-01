import { Column, Entity, PrimaryColumn, UpdateDateColumn, CreateDateColumn, DeleteDateColumn } from 'typeorm' ;
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class SfProject{

  @ApiProperty({
    description: '项目id'
  })
  @PrimaryColumn({
    name:'project_id',
    comment: '主键'
  })
  projectId: string

  @ApiProperty({
    description: '项目编码'
  })
  @Column({
    name:'project_code',
    nullable: true,
    comment: '项目编码'
  })
  projectCode: string

  @ApiProperty({
    description: '项目名称'
  })
  @Column({
    name:'project_name',
    nullable: false,
    comment: '项目名称'
  })
  projectName: string

  @ApiProperty({
    description: '上次同步项目id'
  })
  @Column({
    name:'sync_project_id',
    nullable: true,
    comment: '上次同步项目id'
  })
  syncProjectId: string

  @ApiProperty({
    description: '项目简称'
  })
  @Column({
    name:'short_name',
    nullable: true,
    comment: '项目简称'
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
    description: '项目描述'
  })
  @Column({
    name:'project_description',
    nullable: true,
    comment: '项目描述'
  })
  projectDescription: string

  @ApiProperty({
    description: '系统名称'
  })
  @Column({
    name:'system_name',
    nullable: true,
    comment: '系统名称'
  })
  systemName: string

  @ApiProperty({
    description: '系统标识'
  })
  @Column({
    name:'system_code',
    nullable: true,
    comment: '系统标识'
  })
  systemCode: string

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
