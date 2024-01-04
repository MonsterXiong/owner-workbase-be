import { Column, Entity, PrimaryColumn, UpdateDateColumn, CreateDateColumn, DeleteDateColumn } from 'typeorm' ;
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Test{

  @ApiProperty({
    description: '更新时间'
  })
  @UpdateDateColumn({
    type: 'timestamp',
    name:'updateDate',
    comment: '更新时间',
  })
  updateDate: Date

  @ApiProperty({
    description: '创建时间'
  })
  @CreateDateColumn({
    type: 'timestamp',
    name:'createdDate',
    comment: '创建时间',
  })
  createdDate: Date

  @ApiProperty({
    description: '锁定时间'
  })
  @Column({
    name:'lock_time',
    nullable: true,
    type: 'timestamp',
    comment: '锁定时间'
  })
  lockTime: Date

  @ApiProperty({
    description: '删除时间'
  })
  @DeleteDateColumn({
    type: 'timestamp',
    name:'deleteDate',
    comment: '删除时间',
  })
  deleteDate: Date

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
    description: '修改人'
  })
  @Column({
    name:'updater',
    nullable: true,
    comment: '修改人'
  })
  updater: string

  @ApiProperty({
    description: '菜单编码'
  })
  @Column({
    name:'menu_code',
    nullable: false,
    comment: '菜单编码'
  })
  menuCode: string

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
    description: '图标'
  })
  @Column({
    name:'icon',
    nullable: true,
    comment: '图标'
  })
  icon: string

  @ApiProperty({
    description: '样式'
  })
  @Column({
    name:'css_style',
    nullable: true,
    comment: '样式'
  })
  cssStyle: string

  @ApiProperty({
    description: '父标识'
  })
  @Column({
    name:'parent_code',
    nullable: true,
    comment: '父标识'
  })
  parentCode: string

  @ApiProperty({
    description: '级别标识'
  })
  @Column({
    name:'level_code',
    nullable: true,
    comment: '级别标识'
  })
  levelCode: string

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
    description: '主键'
  })
  @PrimaryColumn({
    name:'id',
    comment: '主键'
  })
  id: string

  @ApiProperty({
    description: ''
  })
  @Column({
    name:'isdel',
    nullable: true,
    comment: ''
  })
  isdel: string

}
