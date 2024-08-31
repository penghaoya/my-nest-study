import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LylService } from './lyl.service';
import { CreateLylDto } from './dto/create-lyl.dto';
import { UpdateLylDto } from './dto/update-lyl.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Lyl')
@Controller('lyl')
export class LylController {
  constructor(private readonly lylService: LylService) {}

  @Post()
  create(@Body() createLylDto: CreateLylDto) {
    return this.lylService.create(createLylDto);
  }

  @Get()
  findAll() {
    return this.lylService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lylService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLylDto: UpdateLylDto) {
    return this.lylService.update(+id, updateLylDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lylService.remove(+id);
  }
}
