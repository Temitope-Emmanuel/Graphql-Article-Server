import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm"
import {User} from "./user/models/user.entity"
import {Article} from "./article/models/article.entity"
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import {GraphQLModule} from "@nestjs/graphql"
import {join} from "path"

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
      entities:[User,Article],
      synchronize:true
    }),
    UserModule,
    ArticleModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
// for typeorm.json
// export class AppModule {
//   constructor(private connection:Connection){}
// }
export class AppModule {
}