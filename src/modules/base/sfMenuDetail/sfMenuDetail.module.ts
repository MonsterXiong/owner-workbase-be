import { Module } from '@nestjs/common';
import { SfMenuDetailService } from './sfMenuDetail.service';
import { SfMenuDetailController } from './sfMenuDetail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SfMenuDetail } from './sfMenuDetail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SfMenuDetail])],
  controllers: [SfMenuDetailController],
  providers: [SfMenuDetailService],
  exports:[SfMenuDetailService]
})
export class SfMenuDetailModule { }