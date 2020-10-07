import { UseGuards } from '@nestjs/common';
import { Args,Query, Int, Mutation, Resolver } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { Comment } from './models/comment.model';
import {CurrentUser} from "../Guards/currentUser"
import {CreateCommentArgs} from "./models/comment.resolver.dto"
import {ArticleService} from "../article/article.service"

@Resolver(of => Comment)
export class CommentResolver {
    constructor(
        private readonly commentService:CommentService,
        private readonly articleService:ArticleService
        ){}

    // @UseGuards(CommentGuard)
    @Mutation(returns => Comment,{name:"createComment"})
    async createComment(@Args("input")input:CreateCommentArgs,@CurrentUser() user:any){
        const foundArticle = this.articleService.getArticle(input.articleId)
        return this.commentService.createComment(input.body,user,foundArticle)
    }

    async getComment(@Args('id')id:string){
        return this.commentService.getComment(id)
    }

    @Mutation(returns => Comment,{name:"deleteComment"})
    async deleteComment(@Args("id")id:string){
        return this.commentService.deleteComment(id)
    }
}
