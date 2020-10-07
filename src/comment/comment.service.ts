import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm"
import {Repository} from "typeorm"
import {Comment} from "./models/comment.entity"
import {} from "./models/comment.resolver.dto"


@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository:Repository<Comment>
    ){}

    createComment(body:string,user,article):Promise<any>{
        return this.commentRepository
        .createQueryBuilder("comment")
        .insert()
        .values({
            body,
            article,
            author:user
        }).execute()
    }
    
    getComment(id:string):Promise<Comment> {
        return this.commentRepository
        .createQueryBuilder("comment")
        .leftJoinAndSelect("comment.author","author")
        .leftJoinAndSelect("comment.article","comment")
        .getOne()
    }

    deleteComment(id:string):Promise<any>{
        return this.commentRepository
        .createQueryBuilder("comment")
        .delete().where("comment.id = :id",{id})
        .execute()
    }
}
