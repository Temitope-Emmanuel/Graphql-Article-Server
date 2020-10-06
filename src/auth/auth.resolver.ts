import {
    Resolver,
    Query,Args,ResolveField,Parent,
} from "@nestjs/graphql"
import {User} from "../user/models/user.model"
import {AuthToken,loginUserArgs} from "../user/models/user.dto"
import {GqlAuthGuard} from "../Guards/authGuard"
import { UseGuards,Req,Request } from "@nestjs/common"
import {AuthService} from "./auth.service"
import {CurrentUser} from "../Guards/currentUser"

@Resolver(of => User)
export class AuthResolver {
    constructor(
        private authService:AuthService
    ){}

    @Query(returns => AuthToken,{name:"login"})
    @UseGuards(GqlAuthGuard)
    async loginUser(@CurrentUser() user:any,@Args('input')loginUserArgs:loginUserArgs){
        return this.authService.login(user)
    }
}