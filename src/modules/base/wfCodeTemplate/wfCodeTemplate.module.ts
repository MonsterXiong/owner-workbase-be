import { Module } from '@nestjs/common';
import { WfCodeTemplateService } from './wfCodeTemplate.service';
import { WfCodeTemplateController } from './wfCodeTemplate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WfCodeTemplate } from './wfCodeTemplate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WfCodeTemplate])],
  controllers: [WfCodeTemplateController],
  providers: [WfCodeTemplateService],
})
export class WfCodeTemplateModule { }