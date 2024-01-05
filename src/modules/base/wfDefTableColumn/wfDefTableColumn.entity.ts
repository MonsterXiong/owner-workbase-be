import { Column, Entity, PrimaryColumn, UpdateDateColumn, CreateDateColumn, DeleteDateColumn } from 'typeorm' ;
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class WfDefTableColumn{

  @ApiProperty({
    description: 'ID'
  })
  @PrimaryColumn({
    name:'table_column_id',
    comment: '主键'
  })
  tableColumnId: string

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
    description: '绑定表'
  })
  @Column({
    name:'bind_table_id',
    nullable: false,
    comment: '绑定表'
  })
  bindTableId: string

  @ApiProperty({
    description: '字段标识'
  })
  @Column({
    name:'field',
    nullable: false,
    comment: '字段标识'
  })
  field: string

  @ApiProperty({
    description: '类型'
  })
  @Column({
    name:'type',
    nullable: false,
    comment: '类型'
  })
  type: string

  @ApiProperty({
    description: '长度'
  })
  @Column({
    name:'length',
    nullable: false,
    comment: '长度'
  })
  length: string

  @ApiProperty({
    description: '不是null'
  })
  @Column({
    name:'not_null',
    nullable: false,
    comment: '不是null'
  })
  notNull: string

  @ApiProperty({
    description: '注释'
  })
  @Column({
    name:'comment',
    nullable: false,
    comment: '注释'
  })
  comment: string

  @ApiProperty({
    description: '是否主键'
  })
  @Column({
    name:'is_pri_key',
    nullable: false,
    comment: '是否主键'
  })
  isPriKey: string

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
