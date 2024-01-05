import { Module } from '@nestjs/common';
import { WfViewMenuService } from './wfViewMenu.service';
import { WfViewMenuController } from './wfViewMenu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WfViewMenu } from './wfViewMenu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WfViewMenu])],
  controllers: [WfViewMenuController],
  providers: [WfViewMenuService],
})
export class WfViewMenuModule { }