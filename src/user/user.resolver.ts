import {
    Resolver,Mutation,
    Query,Args
} from "@nestjs/graphql"
import {User} from "./models/user.model"
import {UserService} from "./user.service"
import {AuthToken,CreateUserArgs} from "./models/user.dto"
import {CurrentUser} from "../Guards/currentUser"
import {JwtAuthGuard} from "../Guards/jwtGuard"
import {UseGuards} from "@nestjs/common"

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

    @Query(returns => User,{name:'Me'})
    @UseGuards(JwtAuthGuard)
    async getMe(@CurrentUser()user:User){
        return user
    }
}