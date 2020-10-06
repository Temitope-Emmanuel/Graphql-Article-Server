import {
    Resolver,Subscription,Int,Mutation,
    Query,Args,ResolveField,Parent
} from "@nestjs/graphql"
import {User} from "./models/user.model"
import {UserService} from "./user.service"
import {AuthToken,CreateUserArgs} from "./models/user.dto"



@Resolver(of => User)
export class UserResolver {
    constructor(
        private userService:UserService
    ){}

    @Query(returns => User,{name:"User"})
    async getUser(@Args("id")id:string){
        return this.userService.findOne(id)
    }
    @Mutation(returns => AuthToken,{name:"registerUser"})
    async createUser(@Args('input')input:CreateUserArgs){
        return this.userService.createUser(input)
    }
}