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
        private usersRepository:Repository<User>,
        @Inject(Crypto) private crypto:CryptoService
    ){}

    async createUser(args:CreateUserDto){
        const newUser = new User()
        const salt = this.makeSalt();
        // const newUser = new User({
        //     ...args,
        //     password:(this.crypto as any)
        //     .createHmac('sha1',salt).update(args.password).digest('hex')
        // })
        newUser.email = args.email
        newUser.salt = salt
        newUser.username = args.username
        newUser.password = (this.crypto as any).createHmac('sha1',salt).update(args.password).digest('hex')
        const result = await this.usersRepository.save(newUser)
        console.log(result)
        return {user:result}
    }

    makeSalt():string {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    }

    findAll():Promise<User[]>{
        return this.usersRepository.find();
    }
    
    findOne(id:string):Promise<User>{
        return this.usersRepository.findOne();
    }

    async remove(id:string):Promise<void>{
        await this.usersRepository.delete(id)
    }
}