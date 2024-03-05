import { Module } from '@nestjs/common';
import { SfMenuExtendService } from './sf-menu-extend.service';
import { SfMenuExtendController } from './sf-menu-extend.controller';

@Module({
  controllers: [SfMenuExtendController],
  providers: [SfMenuExtendService]
})
export class SfMenuExtendModule {}
