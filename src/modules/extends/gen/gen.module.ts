import { Module } from '@nestjs/common';
import { GenService } from './gen.service';
import { GenController } from './gen.controller';
import { SfProjectExtendModule } from '../sf-project-extend/sf-project-extend.module';

@Module({
  imports:[SfProjectExtendModule],
  controllers: [GenController],
  providers: [GenService]
})
export class GenModule {}
