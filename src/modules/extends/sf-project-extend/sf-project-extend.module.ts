import { SfProjectConfigModule } from './../../base/sfProjectConfig/sfProjectConfig.module';
import { Module } from '@nestjs/common';
import { SfProjectExtendService } from './sf-project-extend.service';
import { SfProjectExtendController } from './sf-project-extend.controller';
import { SfMenuDetailModule, SfMenuModule, SfProjectModule } from '../../base';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports:[SfProjectModule,SfProjectConfigModule,SfMenuModule,SfMenuDetailModule,DatabaseModule],
  controllers: [SfProjectExtendController],
  providers: [SfProjectExtendService],
  exports:[SfProjectExtendService]
})
export class SfProjectExtendModule {}
