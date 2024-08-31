import { Controller, Get, UseGuards, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@/common/guard/auth.guard';
@Controller('xxx')
@UseGuards(AuthGuard)
export class BookController {
  @Get()
  @SetMetadata('roles', ['admin'])
  findAll() {
    return 'xxxxxxxxxxxxxxxxxxxx';
  }
}
