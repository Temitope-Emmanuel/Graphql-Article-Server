import { 
  Entity, Column, PrimaryGeneratedColumn,
  CreateDateColumn,UpdateDateColumn,OneToMany } from 'typeorm';
import {Article} from '../../article/models/article.entity'
import {Comment} from "../../comment/models/comment.entity"

export enum UserRole {
  ADMIN = 'admin',
  WRITER = 'writer',
  USER = 'USER'
}

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({unique:true})
  username: string;

  @Column({unique:true})
  email: string;
  
  @Column({select:false})
  password: string;
  
  @Column({update:false,select:false})
  salt: string;

  @Column({
    type:'enum',
    enum:UserRole,
    default:UserRole.USER
  })
  role:UserRole;

  @Column({ default: false })
  verified: boolean;

  @OneToMany(type => Article, article => article.author)
  article:Article[];
  
  @OneToMany(type => Comment, comment => comment.author)
  comments:Comment[];

  @CreateDateColumn({update:false})
  createdAt:Date;

  @UpdateDateColumn()
  updatedAt:Date;
}