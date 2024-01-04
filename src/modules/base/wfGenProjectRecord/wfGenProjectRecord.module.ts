import { Module } from '@nestjs/common';
import { WfGenProjectRecordService } from './wfGenProjectRecord.service';
import { WfGenProjectRecordController } from './wfGenProjectRecord.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WfGenProjectRecord } from './wfGenProjectRecord.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WfGenProjectRecord])],
  controllers: [WfGenProjectRecordController],
  providers: [WfGenProjectRecordService],
})
export class WfGenProjectRecordModule { }