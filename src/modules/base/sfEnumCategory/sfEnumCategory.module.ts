import { Module } from '@nestjs/common';
import { SfEnumCategoryService } from './sfEnumCategory.service';
import { SfEnumCategoryController } from './sfEnumCategory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SfEnumCategory } from './sfEnumCategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SfEnumCategory])],
  controllers: [SfEnumCategoryController],
  providers: [SfEnumCategoryService],
  exports:[SfEnumCategoryService]
})
export class SfEnumCategoryModule { }