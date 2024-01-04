import { Column, Entity, PrimaryColumn, UpdateDateColumn, CreateDateColumn, DeleteDateColumn } from 'typeorm' ;
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ZyDatabasePool{

  @ApiProperty({
    description: 'ID'
  })
  @PrimaryColumn({
    name:'database_id',
    comment: '主键'
  })
  databaseId: string

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
    description: '描述'
  })
  @Column({
    name:'description',
    nullable: true,
    comment: '描述'
  })
  description: string

  @ApiProperty({
    description: '主机'
  })
  @Column({
    name:'host',
    nullable: false,
    comment: '主机'
  })
  host: string

  @ApiProperty({
    description: '端口'
  })
  @Column({
    name:'port',
    nullable: false,
    comment: '端口'
  })
  port: string

  @ApiProperty({
    description: '账号'
  })
  @Column({
    name:'account',
    nullable: false,
    comment: '账号'
  })
  account: string

  @ApiProperty({
    description: '密码'
  })
  @Column({
    name:'password',
    nullable: false,
    comment: '密码'
  })
  password: string

  @ApiProperty({
    description: '数据库类型'
  })
  @Column({
    name:'type',
    nullable: false,
    comment: '数据库类型'
  })
  type: string

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
