import { Module } from '@nestjs/common';
import { SfMenuService } from './sfMenu.service';
import { SfMenuController } from './sfMenu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SfMenu } from './sfMenu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SfMenu])],
  controllers: [SfMenuController],
  providers: [SfMenuService],
  exports:[SfMenuService]
})
export class SfMenuModule { }