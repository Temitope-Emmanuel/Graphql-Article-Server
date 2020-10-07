import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm"
import { ArticleService } from './article.service';
import {Article} from "./models/article.entity"
import {ArticleResolver} from "./article.resolver"
import {CommentModule} from "../comment/comment.module"
// import {} from ""

@Module({
  imports:[
    TypeOrmModule.forFeature([Article]),
    CommentModule],
  providers: [ArticleService,ArticleResolver],
  exports:[ArticleService]
})
export class ArticleModule {}
