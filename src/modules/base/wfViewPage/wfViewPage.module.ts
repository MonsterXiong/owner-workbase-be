import { Module } from '@nestjs/common';
import { WfViewPageService } from './wfViewPage.service';
import { WfViewPageController } from './wfViewPage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WfViewPage } from './wfViewPage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WfViewPage])],
  controllers: [WfViewPageController],
  providers: [WfViewPageService],
})
export class WfViewPageModule { }