import { SfMenuDetailModule } from './../../base/sfMenuDetail/sfMenuDetail.module';
import { Module } from '@nestjs/common';
import { SfMenuExtendService } from './sf-menu-extend.service';
import { SfMenuExtendController } from './sf-menu-extend.controller';
import { SfMenuModule } from './../../base/sfMenu/sfMenu.module';

@Module({
  imports:[SfMenuModule,SfMenuDetailModule],
  controllers: [SfMenuExtendController],
  providers: [SfMenuExtendService],
  exports:[SfMenuExtendService]
})
export class SfMenuExtendModule {}
