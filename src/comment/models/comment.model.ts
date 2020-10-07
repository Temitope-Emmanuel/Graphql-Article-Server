import {Field,ObjectType} from "@nestjs/graphql"
import {User as Author} from "../../user/models/user.model"
import {Article} from "../../article/models/article.model"

@ObjectType()
export class Comment {
  @Field()
  id: string;

  @Field()
  body: string;
  
  @Field(type => Author)
  author:Author
  
  @Field(type => Article)
  article:Article

  @Field(type => Date)
  createdAt:Date;

  @Field(type => Date)
  updatedAt:Date
}