import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm"
import {Repository} from "typeorm"
import {Comment} from "./models/comment.entity"

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository:Repository<Comment>
    ){}

    async createComment(body:string,author,article):Promise<any>{
        const newComment = new Comment()
        newComment.article = article
        newComment.author = author
        newComment.body = body
        const response = await this.commentRepository.save(newComment)
        return response
    }
    
    getComment(id:string):Promise<Comment> {
        return this.commentRepository
        .createQueryBuilder("comment")
        // .leftJoinAndSelect("comment.author","author")
        // .leftJoinAndSelect("comment.article","comments")
        .getOne()
    }

    async deleteComment(id:string):Promise<any>{
        const response = await this.commentRepository
        .createQueryBuilder("comment")
        .where("comment.id = :id",{id}).getOne()

        await this.commentRepository
        .createQueryBuilder("comment")
        .delete().where("comment.id = :id",{id})
        .execute()
        return response
    }

    getCommentAuthor(id:string):Promise<Comment>{
        return this.commentRepository
        .createQueryBuilder("comment")
        .where("comment.id = :id",{id})
        .leftJoinAndSelect("comment.author","author")
        .getOne()
    }
    
    getCommentArticle(id:string):Promise<Comment>{
        return this.commentRepository
        .createQueryBuilder("comment")
        .where("comment.id = :id",{id})
        .leftJoinAndSelect("comment.article","article")
        .getOne()
    }
    getCommentsByUser(id:string):Promise<Comment[]>{
        return this.commentRepository
        .createQueryBuilder("comment")
        .where("comment.author = :id",{id})
        .getMany()
    }
}
