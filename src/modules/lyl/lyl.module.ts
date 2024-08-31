import { Module } from '@nestjs/common';
import { LylService } from './lyl.service';
import { LylController } from './lyl.controller';

@Module({
  controllers: [LylController],
  providers: [LylService],
  exports: [LylService],
})
export class LylModule {}
