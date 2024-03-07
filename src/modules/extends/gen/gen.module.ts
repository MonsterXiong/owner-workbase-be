import { Module } from '@nestjs/common';
import { GenService } from './gen.service';
import { GenController } from './gen.controller';
import { SfProjectExtendModule } from '../sf-project-extend/sf-project-extend.module';
import { SfMenuExtendModule } from '../sf-menu-extend/sf-menu-extend.module';

@Module({
  imports:[SfProjectExtendModule,SfMenuExtendModule],
  controllers: [GenController],
  providers: [GenService],
  exports: [GenService]
})
export class GenModule {}
