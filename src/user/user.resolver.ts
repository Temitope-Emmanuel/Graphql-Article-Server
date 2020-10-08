import {
    Resolver,Mutation,
    Query,Args,ResolveField,Parent
} from "@nestjs/graphql"
import {User} from "./models/user.model"
import {Comment} from "../comment/models/comment.model"
import {Article} from "../article/models/article.model"
import {UserService} from "./user.service"
import {AuthToken,CreateUserArgs} from "./models/user.dto"
import {CurrentUser} from "../Guards/currentUser"
import {JwtAuthGuard} from "../Guards/jwtGuard"
import {UseGuards} from "@nestjs/common"
import {CommentService} from "../comment/comment.service"
import {ArticleService} from "../article/article.service"

@Resolver(of => User)
export class UserResolver {
    constructor(
        private readonly userService:UserService,
        private readonly articleService:ArticleService,
        private readonly commentService:CommentService
    ){}

    @Query(returns => User,{name:"User"})
    async getUser(@Args("id")id:string){
        return this.userService.findOne(id)
    }
    
    @Mutation(returns => AuthToken,{name:"registerUser"})
    async createUser(@Args('input')input:CreateUserArgs){
        return this.userService.createUser(input)
    }

    @Query(returns => User,{name:'Me'})
    @UseGuards(JwtAuthGuard)
    async getMe(@CurrentUser()user:User){
        return user
    }

    @ResolveField("comments",returns => [Comment])
    async getUserComments(@Parent(){id}:User){
        return this.commentService.getCommentsByUser(id)
    }

    @ResolveField("article",returns => [Article])
    async getAuthorArticles(@Parent(){id}:User){
        return this.articleService.getArticlesByAuthor(id)
    }
}