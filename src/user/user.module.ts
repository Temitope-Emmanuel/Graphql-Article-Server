import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import {TypeOrmModule} from "@nestjs/typeorm"
import {User} from "./models/user.entity"
import {UserResolver} from "./user.resolver"
import {CryptoModule} from "./crypto/crypto.module"

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    CryptoModule
  ],
  providers: [
    UserService,
    UserResolver],
  exports:[UserService]
})
export class UserModule {}
