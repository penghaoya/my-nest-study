import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { Logger } from 'winston';
import { LylService } from '../lyl/lyl.service';
import { LoginPipe } from '@/common/pipe/login.pipe';
import { AuthGuard } from '@/common/guard/auth.guard';

@ApiTags('用户管理')
@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(
    private readonly lyl: LylService,
    private readonly userService: UserService,
    @Inject('FILE_LOGGER') private readonly fileLogger: Logger,
    @Inject('CONSOLE_LOGGER') private readonly consoleLogger: Logger,
  ) {}

  @Post()
  @ApiOperation({ summary: '创建新用户', description: '创建一个新的用户记录' })
  @ApiBody({ type: CreateUserDto, description: '用户创建数据' })
  @ApiResponse({
    status: 201,
    description: '用户创建成功1',
    type: CreateUserDto,
  })
  create(@Body(LoginPipe) createUserDto: CreateUserDto, @Body('a') a: string) {
    // this.consoleLogger.info('创建新用户');
    this.consoleLogger.warn(a);
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有用户', description: '返回所有用户的列表' })
  @ApiResponse({
    status: 200,
    description: '成功获取用户列表',
    type: [CreateUserDto],
  })
  findAll() {
    return this.lyl.findAll();
    // return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: '获取指定用户',
    description: '根据用户ID返回用户信息',
  })
  @ApiParam({ name: 'id', type: 'number', description: '用户ID' })
  @ApiResponse({
    status: 200,
    description: '成功返回用户信息',
    type: CreateUserDto,
  })
  @ApiResponse({ status: 404, description: '用户不存在' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '更新用户信息',
    description: '根据用户ID更新用户信息',
  })
  @ApiParam({ name: 'id', type: 'number', description: '用户ID' })
  @ApiBody({ type: UpdateUserDto, description: '用户更新数据' })
  @ApiResponse({
    status: 200,
    description: '用户信息更新成功',
    type: UpdateUserDto,
  })
  @ApiResponse({ status: 404, description: '用户不存在' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户', description: '根据用户ID删除用户' })
  @ApiParam({ name: 'id', type: 'number', description: '用户ID' })
  @ApiResponse({ status: 200, description: '用户删除成功' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
