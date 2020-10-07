import {UseGuards} from "@nestjs/common"
import {Resolver,Int,Mutation,Query,Args} from "@nestjs/graphql"
import {Article} from "./models/article.model"
import {ArticleService} from "./article.service"
import {CurrentUser} from "../Guards/currentUser"
import {JwtAuthGuard} from "../Guards/jwtGuard"
import {CreateArticleArgs,getAllArticleArgs} from "./models/resolver.dto"

@Resolver(of => Article)
export class ArticleResolver {
    constructor(
        private readonly articleService:ArticleService
    ){}

    @UseGuards(JwtAuthGuard)
    @Mutation(returns => Article,{name:"CreateArticle"})
    async createArticle(@Args('input')input:CreateArticleArgs,@CurrentUser() user:any){
        return this.articleService.createArticle(input,user)
    }

    @Query(returns => Article,{name:"getArticle"})
    async getArticle(@Args("id")id:string){
        return this.articleService.getArticle(id)
    }

    @Query(returns => [Article],{name:"getAllArticle"})
    async getAllArticle(@Args() args:getAllArticleArgs){
        return this.articleService.getAllArticles(args)
    }
    
    @Mutation(returns => Article,{name:"deleteArticle"})
    async deleteArticle(@Args("id")id:string){
        return await this.articleService.deleteArticle(id)
    }
}