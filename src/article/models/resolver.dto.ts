import {MinLength} from "class-validator"
import {Field,ArgsType,Int,InputType} from "@nestjs/graphql"

@InputType()
export class CreateArticleArgs {
    @Field()
    @MinLength(5)
    title:string;
    
    @Field()
    body:string;
}

@ArgsType()
export class getAllArticleArgs{
    @Field(returns => Int,{nullable:true,defaultValue:10})
    limit:number;
    @Field( returns => Int,{nullable:true,defaultValue:0})
    skip:number;
}