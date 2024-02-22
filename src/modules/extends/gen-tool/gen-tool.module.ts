import { Module } from '@nestjs/common';
import { GenToolService } from './gen-tool.service';
import { GenToolController } from './gen-tool.controller';

@Module({
  controllers: [GenToolController],
  providers: [GenToolService]
})
export class GenToolModule {}
