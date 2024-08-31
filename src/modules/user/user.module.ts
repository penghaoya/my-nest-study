import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { LylService } from '../lyl/lyl.service';

@Module({
  controllers: [UserController],
  providers: [UserService, LylService],
})
export class UserModule {}
