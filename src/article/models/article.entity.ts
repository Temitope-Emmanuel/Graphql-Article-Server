import { 
  Entity,Column,OneToMany,
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
  
  @OneToMany(type => Comment, comment => comment.article)
  comments:Comment[]

  @CreateDateColumn({type:Date})
  createdAt:Date;

  @UpdateDateColumn({type:Date})
  updatedAt:Date;
}