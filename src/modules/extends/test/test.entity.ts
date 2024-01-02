import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity } from 'typeorm';

export class ConditionParams {
  @ApiProperty({
    description: '字段',
    required: true,
  })
  property: string;

  // 枚举
  @ApiProperty({
    description: '标识',
    required: false,
  })
  symbol: string;

  @ApiProperty({
    description: '值',
    required: false,
  })
  value: string;

  @ApiProperty({
    description: 'combine',
    required: false,
  })
  combine: string;
}

export class SortParams {
  @ApiProperty({
    description: '字段',
    required: true,
  })
  property: string;

  @ApiProperty({
    description: '属性类型',
    required: false,
  })
  propertyType: string;

  @ApiProperty({
    description: '升序DESC 降序ASC',
    required: false,
  })
  isDesc: string;
}

export class ConditionDto {
  @ApiProperty({
    description: '用户id',
    required: true,
  })
  conditionParams: Array<ConditionParams>;

  @ApiProperty({
    description: '状态',
    required: false,
  })
  sortParams: SortParams[];

  @ApiProperty({
    description: '页码',
    required: false,
  })
  pageNumber: number;

  @ApiProperty({
    description: '页数大小',
    required: false,
  })
  pageSize: number;
}
@Entity()
export class Test extends BaseEntity {
  @ApiProperty({
    description: '菜单编码',
  })
  @Column({ comment: '菜单编码' })
  menu_code: string;

  @ApiProperty({
    description: '名称',
  })
  @Column({ comment: '名称' })
  name: string;

  @ApiProperty({
    description: '图标',
  })
  @Column({ nullable: true, comment: '图标' })
  icon: string;

  @ApiProperty({
    description: '样式',
  })
  @Column({ nullable: true, comment: '样式' })
  css_style: string;

  @ApiProperty({
    description: '父标识',
  })
  @Column({ nullable: true, comment: '父标识' })
  parent_code: string;

  @ApiProperty({
    description: '级别标识',
  })
  @Column({ nullable: true, comment: '级别标识' })
  level_code: string;

  @ApiProperty({
    description: '排序',
  })
  @Column({ nullable: true, comment: '排序' })
  sort: number;
}
