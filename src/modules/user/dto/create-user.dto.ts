import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 5, {
    message: '3-5长度',
  })
  @ApiProperty({ example: 'xxxx' })
  name: string;

  @IsNumber()
  @ApiProperty({ example: 18 })
  age: number;
}
