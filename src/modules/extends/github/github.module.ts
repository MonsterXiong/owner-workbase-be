import { Module } from '@nestjs/common';
import { GithubService } from './github.service';
import { GithubController } from './github.controller';
import { GenerateService } from '../generate/generate.service';

@Module({
  controllers: [GithubController],
  providers: [GithubService,GenerateService]
})
export class GithubModule {}
