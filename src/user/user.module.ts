import { Module,forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import {TypeOrmModule} from "@nestjs/typeorm"
import {User} from "./models/user.entity"
import {UserResolver} from "./user.resolver"
import {CryptoModule} from "./crypto/crypto.module"
import {CommentModule} from "../comment/comment.module"
import {ArticleModule} from "../article/article.module"

@Module({
  imports:[
    CommentModule,
    forwardRef(() => ArticleModule),
    TypeOrmModule.forFeature([User]),
    CryptoModule
  ],
  providers: [
    UserService,
    UserResolver],
  exports:[UserService]
})
export class UserModule {}
