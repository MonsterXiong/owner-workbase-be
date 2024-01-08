import { Module } from '@nestjs/common';
import { GiteeService } from './gitee.service';
import { GiteeController } from './gitee.controller';

@Module({
  controllers: [GiteeController],
  providers: [GiteeService]
})
export class GiteeModule {}
