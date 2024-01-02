import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @ApiProperty({
    description: '主键id'
  })
  @PrimaryGeneratedColumn({ comment: '主键' })
  id: number;

  @ApiProperty({
    description: '更新时间'
  })
  @UpdateDateColumn({
    type: 'timestamp',
    comment: '更新时间',
  })
  updateDate: Date;


  @ApiProperty({
    description: '创建时间'
  })
  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间',
  })
  createdDate: Date;

  @ApiProperty({
    description: '锁定时间'
  })
  @Column({ nullable: true, type: 'timestamp', comment: '锁定时间' })
  lock_time: Date;


  @ApiProperty({
    description: '删除时间'
  })
  @DeleteDateColumn({ nullable: true, type: 'timestamp', comment: '删除时间' })
  deleteDate: Date;


  @ApiProperty({
    description: '创建人'
  })
  @Column({ nullable: true, comment: '创建人' })
  creator: string;


  @ApiProperty({
    description: '修改人'
  })
  @Column({ nullable: true, comment: '修改人' })
  updater: string;
}
