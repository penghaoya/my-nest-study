import { Injectable } from '@nestjs/common';
import { CreateLylDto } from './dto/create-lyl.dto';
import { UpdateLylDto } from './dto/update-lyl.dto';

@Injectable()
export class LylService {
  create(createLylDto: CreateLylDto) {
    return 'This action adds a new lyl';
  }

  findAll() {
    return `This action retur1ns all lyl`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lyl`;
  }

  update(id: number, updateLylDto: UpdateLylDto) {
    return `This action updates a #${id} lyl`;
  }

  remove(id: number) {
    return `This action removes a #${id} lyl`;
  }
}
