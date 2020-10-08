  import { 
  Entity,Column,PrimaryGeneratedColumn,
  CreateDateColumn,UpdateDateColumn,ManyToOne} from 'typeorm';
import {User} from '../../user/models/user.entity'
import {Article} from "../../article/models/article.entity"

@Entity()
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id:string;

  @Column({type:"text"})
  body: string;
  
  @ManyToOne(type => User, user => user.comments)
  author:User
  
  @ManyToOne(type => Article, article => article.comments)
  article:User

  @CreateDateColumn({type:Date})
  createdAt:Date;

  @UpdateDateColumn({type:Date})
  updatedAt:Date;
}