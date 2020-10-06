import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {UserModule} from "../user/user.module"
import {PassportModule} from "@nestjs/passport"
import {LocalStrategy} from "./local.strategy"
import {AuthResolver} from "./auth.resolver"
import {JwtModule} from "@nestjs/jwt"
import {jwtConstants} from "./models/config"
import {JwtStrategy} from "./jwt.strategy"

@Module({
  imports:[
    UserModule,
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret:jwtConstants.secret,
      signOptions:{expiresIn:'1d'}
    })
  ],
  providers: [LocalStrategy,JwtStrategy,AuthService,AuthResolver],
  exports:[AuthService]
})
export class AuthModule {}

// @Module({
//   imports: [
//     PassportModule.register({ defaultStrategy: 'jwt' }),
//     JwtModule.register({ secretOrPrivateKey: process.env.JWT_SECRET }),
//     UserModule,
//   ],
//   providers: [AuthResolver],
// })