import { Module } from '@nestjs/common';
import { WfGenProjectService } from './wfGenProject.service';
import { WfGenProjectController } from './wfGenProject.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WfGenProject } from './wfGenProject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WfGenProject])],
  controllers: [WfGenProjectController],
  providers: [WfGenProjectService],
})
export class WfGenProjectModule { }