import { Module } from '@nestjs/common';
import { SfEnumService } from './sfEnum.service';
import { SfEnumController } from './sfEnum.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SfEnum } from './sfEnum.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SfEnum])],
  controllers: [SfEnumController],
  providers: [SfEnumService],
  exports:[SfEnumService]
})
export class SfEnumModule { }