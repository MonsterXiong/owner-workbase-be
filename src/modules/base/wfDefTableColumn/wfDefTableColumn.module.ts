import { Module } from '@nestjs/common';
import { WfDefTableColumnService } from './wfDefTableColumn.service';
import { WfDefTableColumnController } from './wfDefTableColumn.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WfDefTableColumn } from './wfDefTableColumn.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WfDefTableColumn])],
  controllers: [WfDefTableColumnController],
  providers: [WfDefTableColumnService],
})
export class WfDefTableColumnModule { }