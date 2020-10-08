import {Field,ArgsType,Int,InputType} from "@nestjs/graphql"

@InputType()
export class CreateCommentArgs {
    @Field()
    body:string;
    
    @Field()
    articleId:string;
}