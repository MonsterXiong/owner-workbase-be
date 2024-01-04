import { Column, Entity, PrimaryColumn, UpdateDateColumn, CreateDateColumn, DeleteDateColumn } from 'typeorm' ;
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class WfGenProjectRecord{

  @ApiProperty({
    description: '主键'
  })
  @PrimaryColumn({
    name:'gen_project_record_id',
    comment: '主键'
  })
  genProjectRecordId: string

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
    description: '所属项目'
  })
  @Column({
    name:'bind_project',
    nullable: false,
    comment: '所属项目'
  })
  bindProject: string

  @ApiProperty({
    description: '生成文件'
  })
  @Column({
    name:'gen_data',
    nullable: false,
    comment: '生成文件'
  })
  genData: string

  @ApiProperty({
    description: '版本号'
  })
  @Column({
    name:'version',
    nullable: false,
    comment: '版本号'
  })
  version: string

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
