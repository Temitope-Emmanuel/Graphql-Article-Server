import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm"
import {Repository} from "typeorm"
import {Article} from "./models/article.entity"
import {CreateArticleArgs,getAllArticleArgs} from "./models/resolver.dto"


@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private readonly articleRepository:Repository<Article>
        ){}

    createArticle(args:CreateArticleArgs,user):Promise<Article>{
        const newArticle = new Article()
        newArticle.author = user
        newArticle.body = args.body
        newArticle.title = args.title
        return this.articleRepository.save(newArticle)
    }

    getAllArticles(args:getAllArticleArgs):Promise<Article[]>{
        return this.articleRepository
        .createQueryBuilder("article")
        .leftJoinAndSelect("article.author","author","name")
        .addSelect("SUM(article)","sum")
        .take(args.limit)
        .skip(args.skip)
        .getMany()
    }    
    async getArticle(id:string):Promise<Article>{
        return this.articleRepository
        .createQueryBuilder('article')
        .where("article.id = :id",{id})
        .leftJoinAndSelect("article.author","author")
        .getOne()
    }
    async deleteArticle(id:string):Promise<any>{
        const response = await this.articleRepository
        .createQueryBuilder('article')
        .where("article.id = :id",{id})
        .leftJoinAndSelect("article.author","author")
        .getOne()
        await this.articleRepository
        .createQueryBuilder("article")
        .delete().where("article.id = :id",{id}).execute()
        return response
    }
}
