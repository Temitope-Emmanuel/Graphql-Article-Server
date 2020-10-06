import {Field,Int,ObjectType} from "@nestjs/graphql"
import {User as Author} from "../../user/models/user.model"

@ObjectType()
export class Article {
  @Field(type => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  body: string;
  
  @Field(type => Author)
  author:Author

  @Field()
  createdAt:Date;

  @Field()
  updatedAt:Date
}