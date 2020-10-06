import { Injectable,UnauthorizedException,NotFoundException } from '@nestjs/common';
import {UserService} from "../user/user.service"
import {JwtService} from "@nestjs/jwt"

@Injectable()
export class AuthService {
    constructor(
        private userService:UserService,
        private JwtService:JwtService
        ){}
    
    async validateUser(email:string,password:string):Promise<any> {
        const user = await this.userService.findOne(email);
        const isTrue = user && user.password == this.userService.encryptPassword({password,salt:user.salt})
        if(user && isTrue){
            const {password,salt,...result} = user;
            return result;
        }
        if(user && !isTrue){
            throw new UnauthorizedException("Password do not match");
        }else{
            throw new NotFoundException("User Not Found")
        }
    }

    async login(user:any){
        const payload = {username:user.username,sub:user.id}
        return {
            access_token:this.JwtService.sign(payload),
            user
        }
    }
}
