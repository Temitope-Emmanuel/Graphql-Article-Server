import {InputType,ObjectType,Field} from "@nestjs/graphql"
import {User} from './user.model'


@ObjectType()
export class AuthToken {
    @Field(type => User)
    user:User;
    @Field()
    access_token:string;
}

@InputType()
export class CreateUserArgs {
    @Field()
    email:string;
    @Field()
    password:string;
    @Field()
    username:string;
}

@InputType()
export class loginUserArgs {
    @Field()
    password:string
    @Field()
    email:string
}