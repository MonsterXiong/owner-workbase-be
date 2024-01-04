import { Column, Entity, PrimaryColumn, UpdateDateColumn, CreateDateColumn, DeleteDateColumn } from 'typeorm' ;
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class WfGenProject{

  @ApiProperty({
    description: '主键'
  })
  @PrimaryColumn({
    name:'project_id',
    comment: '主键'
  })
  projectId: string

  @ApiProperty({
    description: '名称'
  })
  @Column({
    name:'name',
    nullable: false,
    comment: '名称'
  })
  name: string

  @ApiProperty({
    description: '项目标识'
  })
  @Column({
    name:'code',
    nullable: true,
    comment: '项目标识'
  })
  code: string

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
    description: '简称'
  })
  @Column({
    name:'alias_name',
    nullable: true,
    comment: '简称'
  })
  aliasName: string

  @ApiProperty({
    description: '映射数据池'
  })
  @Column({
    name:'bind_databae_pool',
    nullable: false,
    comment: '映射数据池'
  })
  bindDatabaePool: string

  @ApiProperty({
    description: '仓库地址'
  })
  @Column({
    name:'repo_url',
    nullable: true,
    comment: '仓库地址'
  })
  repoUrl: string

  @ApiProperty({
    description: '数据来源'
  })
  @Column({
    name:'database_source',
    nullable: false,
    comment: '数据来源'
  })
  databaseSource: string

  @ApiProperty({
    description: '所属代码框架'
  })
  @Column({
    name:'bind_code_template',
    nullable: false,
    comment: '所属代码框架'
  })
  bindCodeTemplate: string

  @ApiProperty({
    description: '排序'
  })
  @Column({
    name:'order_num',
    nullable: true,
    comment: '排序'
  })
  orderNum: number

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
    description: '创建ip'
  })
  @Column({
    name:'create_ip',
    nullable: true,
    comment: '创建ip'
  })
  createIp: string

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

  @ApiProperty({
    description: '修改ip'
  })
  @Column({
    name:'update_ip',
    nullable: true,
    comment: '修改ip'
  })
  updateIp: string

}
