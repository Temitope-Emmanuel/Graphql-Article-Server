import {ExtractJwt,Strategy} from "passport-jwt"
import {PassportStrategy} from "@nestjs/passport"
import {Injectable} from "@nestjs/common"
import {jwtConstants} from "./models/config"
import {UserService} from "../user/user.service"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly userService:UserService){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:true,
            secretOrKey:jwtConstants.secret
        })
    }
    async validate(payload:any){
        const foundUser = await this.userService.find(payload.sub)
        const {salt,password,...result} = foundUser
            return {...result}
    }
}