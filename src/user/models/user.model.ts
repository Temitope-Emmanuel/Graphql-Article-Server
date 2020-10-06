import { Field, Int, ObjectType } from '@nestjs/graphql';
import {Article} from "../../article/models/article.model"

@ObjectType()
export class User {
  @Field(type => Int)
  id: number;

  @Field()
  username: string;

  @Field()
  email: string;
  
  // @Field()
  // password: string;

  @Field()
  verified: boolean;

  // @Field()
  // role:string[]

  @Field(type => [Article])
  article:Article[];

  @Field(type => Date)
  createdAt:Date;

  @Field(type => Date)
  updatedAt:Date;
}