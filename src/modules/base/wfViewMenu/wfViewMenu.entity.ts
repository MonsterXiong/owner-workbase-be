import { Column, Entity, PrimaryColumn, UpdateDateColumn, CreateDateColumn, DeleteDateColumn } from 'typeorm' ;
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class WfViewMenu{

  @ApiProperty({
    description: 'ID'
  })
  @PrimaryColumn({
    name:'view_menu_id',
    comment: '主键'
  })
  viewMenuId: string

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
    description: '绑定生成项目'
  })
  @Column({
    name:'bind_gen_project_id',
    nullable: false,
    comment: '绑定生成项目'
  })
  bindGenProjectId: string

  @ApiProperty({
    description: '菜单类型（模块还是页面）'
  })
  @Column({
    name:'type',
    nullable: false,
    comment: '菜单类型（模块还是页面）'
  })
  type: string

  @ApiProperty({
    description: '触发类型（页面、弹窗、事件）'
  })
  @Column({
    name:'emit_type',
    nullable: false,
    comment: '触发类型（页面、弹窗、事件）'
  })
  emitType: string

  @ApiProperty({
    description: '父菜单'
  })
  @Column({
    name:'parent_id',
    nullable: true,
    comment: '父菜单'
  })
  parentId: string

  @ApiProperty({
    description: '触发类型的事件参数'
  })
  @Column({
    name:'emit_params',
    nullable: true,
    comment: '触发类型的事件参数'
  })
  emitParams: string

  @ApiProperty({
    description: '菜单别名'
  })
  @Column({
    name:'alias_name',
    nullable: true,
    comment: '菜单别名'
  })
  aliasName: string

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
    description: '图标类型png、svg、el-class'
  })
  @Column({
    name:'iconType',
    nullable: true,
    comment: '图标类型png、svg、el-class'
  })
  iconType: string

  @ApiProperty({
    description: '图标大小'
  })
  @Column({
    name:'icon_size',
    nullable: true,
    comment: '图标大小'
  })
  iconSize: string

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
