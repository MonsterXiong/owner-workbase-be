import { Module } from '@nestjs/common';
import { WfDefTableService } from './wfDefTable.service';
import { WfDefTableController } from './wfDefTable.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WfDefTable } from './wfDefTable.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WfDefTable])],
  controllers: [WfDefTableController],
  providers: [WfDefTableService],
})
export class WfDefTableModule { }