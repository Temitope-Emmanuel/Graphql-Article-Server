import { Field, Int, ObjectType,registerEnumType } from '@nestjs/graphql';
import {Article} from "../../article/models/article.model"
import {UserRole} from "./user.entity"
import {Comment} from "../../comment/models/comment.model"

registerEnumType(UserRole,{
  name:'UserRole'
})
@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;
  
  @Field()
  verified: boolean;

  @Field(returns => UserRole)
  role:UserRole

  @Field(type => [Article])
  article:Article[];

  @Field(type => [Comment])
  comments:Comment[]

  @Field(type => Date)
  createdAt:Date;

  @Field(type => Date)
  updatedAt:Date;
}