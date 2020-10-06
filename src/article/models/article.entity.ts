import { Entity, Column, PrimaryGeneratedColumn,OneToMany,JoinColumn,ManyToOne} from 'typeorm';
import {User} from '../../user/models/user.entity'

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({type:"text"})
  body: string;
  
  @ManyToOne(type => User, user => user.article)
  author:User

  @Column({default:new Date(),type:"date"})
  createdAt:Date;

  @Column({default:new Date(),type:"date"})
  updatedAt:Date;
}