import {InputType,ObjectType,ArgsType,Int,Field} from "@nestjs/graphql"
import {User} from './user.model'


@ObjectType()
export class AuthToken {
    @Field(type => User)
    user:User;
    @Field()
    token:string;
}

// @ArgsType()
@InputType()
export class CreateUserArgs {
    @Field()
    email:string;
    @Field()
    password:string;
    @Field()
    username:string;
}