import { Column, Entity, PrimaryColumn, UpdateDateColumn, CreateDateColumn, DeleteDateColumn } from 'typeorm' ;
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class SfMenu{

  @ApiProperty({
    description: '菜单id'
  })
  @PrimaryColumn({
    name:'menu_id',
    comment: '主键'
  })
  menuId: string

  @ApiProperty({
    description: '菜单名称'
  })
  @Column({
    name:'menu_name',
    nullable: false,
    comment: '菜单名称'
  })
  menuName: string

  @ApiProperty({
    description: '菜单编码'
  })
  @Column({
    name:'menu_code',
    nullable: true,
    comment: '菜单编码'
  })
  menuCode: string

  @ApiProperty({
    description: '英文名称'
  })
  @Column({
    name:'english_name',
    nullable: true,
    comment: '英文名称'
  })
  englishName: string

  @ApiProperty({
    description: '所属功能'
  })
  @Column({
    name:'parent_id',
    nullable: true,
    comment: '所属功能'
  })
  parentId: string

  @ApiProperty({
    description: '级别编码'
  })
  @Column({
    name:'level_code',
    nullable: true,
    comment: '级别编码'
  })
  levelCode: string

  @ApiProperty({
    description: '菜单标签'
  })
  @Column({
    name:'tag',
    nullable: true,
    comment: '菜单标签'
  })
  tag: string

  @ApiProperty({
    description: '菜单类型'
  })
  @Column({
    name:'menu_type',
    nullable: true,
    comment: '菜单类型'
  })
  menuType: string

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
    description: '状态'
  })
  @Column({
    name:'status',
    nullable: true,
    comment: '状态'
  })
  status: string

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
    description: '描述'
  })
  @Column({
    name:'remark',
    nullable: true,
    comment: '描述'
  })
  remark: string

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
