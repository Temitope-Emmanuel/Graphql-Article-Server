import {Field,ArgsType,Int,InputType} from "@nestjs/graphql"

@InputType()
export class CreateCommentArgs {
    @Field()
    body:string;
    
    @Field(type => Int)
    articleId:string;
}
// 932db902-c4ec-468a-86ad-1864a111f762