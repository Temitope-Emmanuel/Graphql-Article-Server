// import {
//     Resolver,Subscription,Int,Mutation,
//     Query,Args,ResolveField,Parent
// } from "@nestjs/graphql"
// import {User} from "../user/models/user.model"
// import {UserService} from "../user/user.service"
// import {AuthToken,RegisterArgs} from "../user/models/Auth.type"



// @Resolver(of => User)
// export class AuthResolver {
//     constructor(
//         private userService:UserService
//     ){}

//     @Query(returns => AuthToken,{name:"registerUser"})
//     async authenticateUser(@Args()args:RegisterArgs){
//         return this.userService.createUser(args)
//     }
// }