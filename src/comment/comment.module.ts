import { forwardRef, Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import {TypeOrmModule} from "@nestjs/typeorm"
import {Comment} from "./models/comment.entity"
import {Article} from "../article/models/article.entity"
import {ArticleModule} from "../article/article.module"
import {CommentResolver} from "./comment.resolver"


@Module({
  imports:[
    forwardRef(() => ArticleModule),
    TypeOrmModule.forFeature([Comment,Article])
  ],
  providers: [CommentService,CommentResolver],
  exports:[CommentService]
})
export class CommentModule {}
