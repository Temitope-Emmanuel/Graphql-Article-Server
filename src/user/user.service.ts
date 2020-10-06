import { Injectable,Inject } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from "typeorm"
import {User} from "./models/user.entity"
import {CreateUserDto} from "./models/service.dto"
import {Crypto,cryptoProvider} from "./crypto/crypto.provider"
import {CryptoService} from "./crypto/crypto.service"

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository:Repository<User>,
        @Inject(Crypto) private readonly crypto:CryptoService
    ){}

    async createUser(args:CreateUserDto){
        const newUser = new User()
        const salt = this.makeSalt();
        newUser.email = args.email
        newUser.salt = salt
        newUser.username = args.username
        newUser.password = this.encryptPassword({password:args.password,salt})
        const result = await this.usersRepository.save(newUser)
        return {user:result}
    }

    makeSalt():string {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    }
    encryptPassword(arg:{password:string,salt:string}):string{
        return (this.crypto as any).createHmac('sha1',arg.salt).update(arg.password).digest('hex')
    }

    findAll():Promise<User[]>{
        return this.usersRepository.find();
    }
    
    findOne(email:string):Promise<User>{
        return this.usersRepository.findOne({where:{email}});
    }

    find(id:string):Promise<User>{
        console.log(id)
        return this.usersRepository.findOne({where:{id}})
    }

    async remove(id:string):Promise<void>{
        await this.usersRepository.delete(id)
    }
}