import { Entity, Column, PrimaryGeneratedColumn,JoinColumn,OneToMany } from 'typeorm';
import {Article} from '../../article/models/article.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;
  
  @Column()
  password: string;
  
  @Column()
  salt: string;

  @Column({ default: false })
  verified: boolean;

  @OneToMany(type => Article, article => article.author)
  article:Article[];

  @Column({default:new Date(),type:"date"})
  createdAt:Date;

  @Column({default:new Date(),type:"date"})
  updatedAt:Date;
}