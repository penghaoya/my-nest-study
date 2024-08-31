import { Module } from '@nestjs/common';
import { XxstudyService } from './xxstudy.service';
import { XxstudyController } from './xxstudy.controller';
import { User } from './entities/xxstudy.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tags } from './entities/tags.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Tags])],
  controllers: [XxstudyController],
  providers: [XxstudyService],
})
export class XxstudyModule {}
