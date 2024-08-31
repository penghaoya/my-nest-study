import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { XxstudyService } from './xxstudy.service';
import { CreateUserDto } from './dto/create-xxstudy.dto';
import { UpdateUserDto } from './dto/update-xxstudy.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@Controller('xxstudy/users')
@ApiTags('xxstudy')
export class XxstudyController {
  constructor(private readonly xxstudyService: XxstudyService) {}

  @Post()
  @ApiOperation({ summary: '创建用户' })
  create(@Body() createXxstudyDto: CreateUserDto) {
    return this.xxstudyService.create(createXxstudyDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有用户' })
  @ApiQuery({
    name: 'page',
    required: false,
    description: '页码',
    type: Number,
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    description: '每页显示的数量',
    type: Number,
  })
  @ApiQuery({
    name: 'keyWord',
    required: false,
    description: '搜索关键字',
    type: String,
  })
  findAll(@Query() query: { keyWord: string; page: number; pageSize: number }) {
    return this.xxstudyService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '查询某个用户' })
  findOne(@Param('id') id: string) {
    return this.xxstudyService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新用户' })
  @ApiParam({ name: 'id', required: true, description: '用户ID' })
  @ApiBody({ type: UpdateUserDto, description: '更新用户的详细信息' })
  update(@Param('id') id: string, @Body() updateXxstudyDto: UpdateUserDto) {
    return this.xxstudyService.update(id, updateXxstudyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  remove(@Param('id') id: string) {
    return this.xxstudyService.remove(id);
  }

  @Post('add/tags')
  @ApiOperation({ summary: '为用户添加标签' })
  addTages(@Body() body: { tags: string[]; userId: string }) {
    return this.xxstudyService.addTage(body);
  }
}
