import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-xxstudy.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
