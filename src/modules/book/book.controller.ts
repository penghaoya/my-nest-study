import { Controller, Get, UseGuards, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@/common/guard/auth.guard';
import { ReqUrl, Xxx } from '@/common/decorator/xxx.decorator';
@Controller('xxx')
@UseGuards(AuthGuard)
export class BookController {
  @Get()
  @Xxx('admin')
  // @SetMetadata('roles', ['admin'])
  findAll(@ReqUrl() url: string) {
    console.log('url', url);
    return 'xxxxxxxxxxxxxxxxxxxx';
  }
}
