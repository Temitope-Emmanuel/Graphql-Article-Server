import {MinLength} from "class-validator"
import {Field,ObjectType,ArgsType,Int,InputType} from "@nestjs/graphql"
import {Article} from "./article.model"

@InputType()
export class CreateArticleArgs {
    @Field()
    @MinLength(5)
    title:string;
    
    @Field()
    body:string;
}


@ObjectType()
export class GetAllArticleReturn {
    @Field(type => [Article])
    article:Article[];
    
    @Field(() => Int)
    count:number;
}

@ArgsType()
export class getAllArticleArgs{
    @Field(returns => Int,{nullable:true,defaultValue:10})
    limit:number;
    @Field( returns => Int,{nullable:true,defaultValue:0})
    skip:number;
}