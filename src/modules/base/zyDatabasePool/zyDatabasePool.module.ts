import { Module } from '@nestjs/common';
import { ZyDatabasePoolService } from './zyDatabasePool.service';
import { ZyDatabasePoolController } from './zyDatabasePool.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZyDatabasePool } from './zyDatabasePool.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ZyDatabasePool])],
  controllers: [ZyDatabasePoolController],
  providers: [ZyDatabasePoolService],
})
export class ZyDatabasePoolModule { }