import { Module } from '@nestjs/common';
import { SfProjectService } from './sfProject.service';
import { SfProjectController } from './sfProject.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SfProject } from './sfProject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SfProject])],
  controllers: [SfProjectController],
  providers: [SfProjectService],
  exports:[SfProjectService]
})
export class SfProjectModule { }