import { UseGuards } from '@nestjs/common';
import { Args,Query, Int, Mutation, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { Comment } from './models/comment.model';
import {User as Author} from "../user/models/user.model"
import {Article} from "../article/models/article.model"
import {CurrentUser} from "../Guards/currentUser"
import {CreateCommentArgs} from "./models/comment.resolver.dto"
import {ArticleService} from "../article/article.service"
import {JwtAuthGuard} from "../Guards/jwtGuard"

@Resolver(of => Comment)
export class CommentResolver {
    constructor(
        private readonly commentService:CommentService,
        private readonly articleService:ArticleService
        ){}

    @UseGuards(JwtAuthGuard)
    @Mutation(returns => Comment,{name:"createComment"})
    async createComment(@Args("input")input:CreateCommentArgs,@CurrentUser() user:any){
        const foundArticle = await this.articleService.getArticle(input.articleId)
        return this.commentService.createComment(input.body,user,foundArticle)
    }

    @Query(returns => Comment,{name:"getComment"})
    async getComment(@Args('id')id:string){
        return this.commentService.getComment(id)
    }

    @ResolveField("author",returns => Author)
    async getCommentAuthor(@Parent(){id}:Comment){
        const response = await this.commentService.getCommentAuthor(id)
    return {
        ...response.author
    }
    }
    @ResolveField("article",returns => Article)
    async getCommentArticle(@Parent(){id}:Comment){
        const response = await this.commentService.getCommentArticle(id)
        return {
            ...response.article
        }
    }

    @Mutation(returns => Comment,{name:"deleteComment"})
    async deleteComment(@Args("id")id:string){
        return this.commentService.deleteComment(id)
    }
}
