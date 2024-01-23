import { Module } from '@nestjs/common';
import { GithubService } from './github.service';
import { GithubController } from './github.controller';
import { GenService } from '../gen/gen.service';

@Module({
  controllers: [GithubController],
  providers: [GithubService,GenService]
})
export class GithubModule {}
