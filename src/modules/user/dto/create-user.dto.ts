import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 5, {
    message: '3-5长度',
  })
  name: string;

  @IsNumber()
  age: number;
}
