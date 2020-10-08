import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm"
import { ArticleService } from './article.service';
import {Article} from "./models/article.entity"
import {ArticleResolver} from "./article.resolver"

@Module({
  imports:[
    TypeOrmModule.forFeature([Article]),
  ],
  providers: [ArticleService,ArticleResolver],
  exports:[ArticleService]
})
export class ArticleModule {}
