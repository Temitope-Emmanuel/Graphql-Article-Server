import {Entity,Column,PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    username:string;
    
    @Column({unique:true})
    email:string;

    @Column()
    password:string;

    @Column()
    verified:boolean;

    @Column({array:true,default:"user"})
    role:string[];

    @Column()
    createdAt:Date;
    
    @Column()
    updatedAt:Date;

}