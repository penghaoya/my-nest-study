import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tags } from './tags.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('simple-json')
  address: {
    city: string;
    street: string;
  };
  @CreateDateColumn()
  createTime: Date;

  @OneToMany(() => Tags, (tags) => tags.user)
  tags: Tags[];
}
