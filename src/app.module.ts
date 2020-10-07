import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm"
import {GraphQLModule} from "@nestjs/graphql"
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import {join} from "path"
import {User} from "./user/models/user.entity"
import {Article} from "./article/models/article.entity"
import {Comment} from "./comment/models/comment.entity"

@Module({
  imports: [
    GraphQLModule.forRoot({
      sortSchema:true,
      autoSchemaFile:join(process.cwd(),'src/schema.gql'),
      playground:true,
      context:({req}) => ({req})
    }),
    TypeOrmModule.forRoot({
      type:"postgres",
      host:'localhost',
      port:5432,
      username:"postgres",
      password:'password',
      database:"test",
      entities:[User,Comment,Article],
      synchronize:true
    }),
    UserModule,
    ArticleModule,
    AuthModule
  ]
})
// for typeorm.json
// export class AppModule {
//   constructor(private connection:Connection){}
// }
export class AppModule {
}