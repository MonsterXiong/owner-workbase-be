import { Module } from '@nestjs/common';
import { GithubService } from './github.service';
import { GithubController } from './github.controller';
import { GenService } from '../gen/gen.service';
import { GenModule } from '../gen/gen.module';

@Module({
  imports:[GenModule],
  controllers: [GithubController],
  providers: [GithubService],
  exports:[GithubService]
})
export class GithubModule {}
