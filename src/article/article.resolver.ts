import {UseGuards} from "@nestjs/common"
import {Resolver,Mutation,Query,Args, ResolveField, Parent} from "@nestjs/graphql"
import {Article} from "./models/article.model"
import {User as Author} from "../user/models/user.model"
import {Comment} from "../comment/models/comment.model"
import {ArticleService} from "./article.service"
import {CurrentUser} from "../Guards/currentUser"
import {JwtAuthGuard} from "../Guards/jwtGuard"
import {CreateArticleArgs,getAllArticleArgs,GetAllArticleReturn} from "./models/resolver.dto"


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
        const response = await this.articleService.getArticle(id)
        return response
    }

    @Query(returns => GetAllArticleReturn,{name:"getAllArticle"})
    async getAllArticle(@Args() args:getAllArticleArgs){
        const [article,count] = await this.articleService.getAllArticles(args)
        return {article,count}
    }
    
    @Mutation(returns => Article,{name:"deleteArticle"})
    async deleteArticle(@Args("id")id:string){
        return this.articleService.deleteArticle(id)
    }
    
    @ResolveField("author",returns => Author)
    async getArticleAuthor(@Parent(){id}:Article){
        const response = await this.articleService.getArticleAuthor(id)
        return {
            ...response.author
        }
    }

    @ResolveField("comments",returns => [Comment])
    async getArticleComment(@Parent(){id}:Article){
        const response = await this.articleService.getArticleComment(id)
        return response.comments
    }
}