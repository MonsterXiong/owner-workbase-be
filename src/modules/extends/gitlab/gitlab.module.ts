import { Module } from '@nestjs/common';
import { GitlabService } from './gitlab.service';
import { GitlabController } from './gitlab.controller';

@Module({
  controllers: [GitlabController],
  providers: [GitlabService]
})
export class GitlabModule {}
