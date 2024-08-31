import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-xxstudy.dto';
import { UpdateUserDto } from './dto/update-xxstudy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/xxstudy.entity';
import { Like, Repository } from 'typeorm';
import { Tags } from './entities/tags.entity';

@Injectable()
export class XxstudyService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(Tags) private readonly tags: Repository<Tags>,
  ) {}
  create(createUserDto: CreateUserDto) {
    const data = new User();
    data.name = createUserDto.name;
    data.address = createUserDto.address;
    return this.user.save(data);
  }

  async findAll(query: { keyWord?: string; page: number; pageSize: number }) {
    const whereCondition = query.keyWord
      ? { name: Like(`%${query.keyWord}%`) }
      : {};

    const [data, total] = await this.user.findAndCount({
      where: whereCondition,
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
      relations: ['tags'],
    });

    return {
      pageData: data,
      total,
    };
  }

  findOne(id: string) {
    return this.user.find({
      where: {
        id,
      },
    });
  }

  update(id: string, updateXxstudyDto: UpdateUserDto) {
    return this.user.update(id, updateXxstudyDto);
  }

  remove(id: string) {
    return this.user.delete(id);
  }

  async addTage(body: { tags: string[]; userId: string }) {
    const userInfor = await this.user.findOne({
      where: { id: body.userId },
      relations: ['tags'], // 加载用户的 tags 关系
    });

    if (!userInfor) {
      throw new NotFoundException('用户不存在');
    }

    // 查找或创建标签，并行处理
    const tagList = await Promise.all(
      body.tags.map(async (tagName) => {
        let tag = await this.tags.findOne({ where: { name: tagName } });
        if (!tag) {
          tag = this.tags.create({ name: tagName });
          await this.tags.save(tag);
        }
        return tag;
      }),
    );

    // 更新用户的标签列表
    userInfor.tags = [...userInfor.tags, ...tagList];
    await this.user.save(userInfor);
    return { tags: tagList };
  }
}
