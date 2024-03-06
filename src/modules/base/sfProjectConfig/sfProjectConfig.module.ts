import { Module } from '@nestjs/common';
import { SfProjectConfigService } from './sfProjectConfig.service';
import { SfProjectConfigController } from './sfProjectConfig.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SfProjectConfig } from './sfProjectConfig.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SfProjectConfig])],
  controllers: [SfProjectConfigController],
  providers: [SfProjectConfigService],
  exports:[SfProjectConfigService]
})
export class SfProjectConfigModule { }