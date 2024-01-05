import { Module } from '@nestjs/common';
import { WfViewComponentService } from './wfViewComponent.service';
import { WfViewComponentController } from './wfViewComponent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WfViewComponent } from './wfViewComponent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WfViewComponent])],
  controllers: [WfViewComponentController],
  providers: [WfViewComponentService],
})
export class WfViewComponentModule { }