import { 
  Entity, Column, PrimaryColumn,
  CreateDateColumn,UpdateDateColumn,OneToMany } from 'typeorm';
import {Article} from '../../article/models/article.entity'
import {v4 as uuid} from "uuid"

export enum UserRole {
  ADMIN = 'admin',
  WRITER = 'writer',
  USER = 'USER'
}

@Entity()
export class User {
  @PrimaryColumn({type:"uuid",default:uuid()})
  id: number;

  @Column({unique:true})
  username: string;

  @Column({unique:true})
  email: string;
  
  @Column()
  password: string;
  
  @Column({update:false})
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

  @CreateDateColumn({update:false})
  createdAt:Date;

  @UpdateDateColumn()
  updatedAt:Date;
}