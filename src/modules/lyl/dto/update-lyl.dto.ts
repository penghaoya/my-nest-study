import { PartialType } from '@nestjs/swagger';
import { CreateLylDto } from './create-lyl.dto';

export class UpdateLylDto extends PartialType(CreateLylDto) {}
