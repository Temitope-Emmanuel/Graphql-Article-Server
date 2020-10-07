import { 
  Entity,Column,PrimaryColumn,
  CreateDateColumn,UpdateDateColumn,
  ManyToOne,PrimaryGeneratedColumn
} from 'typeorm';
import {User} from '../../user/models/user.entity'
import {Comment} from '../../comment/models/comment.entity'

@Entity()
export class Article {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({unique:true})
  title: string;

  @Column({type:"text"})
  body: string;
  
  @ManyToOne(type => User, user => user.article)
  author:User
  
  @ManyToOne(type => Comment, comment => comment.article)
  comments:User

  @CreateDateColumn({type:Date})
  createdAt:Date;

  @UpdateDateColumn({type:Date})
  updatedAt:Date;
}