import { Controller, Post, Body, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import * as password from 'password-hash-and-salt';
import * as jwt from 'jsonwebtoken';
import {JWT_SECRET} from "../constants";
import { User } from '../user/model/user';
import { CreatUserDto } from "src/user/dto/createuser.dto";

@Controller("auth")
export class AuthController{

    constructor(@InjectModel("User") private userModel: Model<User>){

    }
    @Post("login")
    async login(@Body("email") email:string, 
    @Body("password") plaintextPassword:string){
        const user = await this.userModel.findOne({email});
        if(!user){
            throw new UnauthorizedException();
        }

        return new Promise((resolve,reject) => {
            password(plaintextPassword).verifyAgainst(
                user.passwordHash,
                (err, verified) => {
                    if(!verified){
                        reject(new UnauthorizedException());
                    }
                    const authJwtToken =
                        jwt.sign({email, roles: user.roles},
                            JWT_SECRET)
                            resolve({authJwtToken});
                }
            );
        });
    }

    @Post('register')
    async Register(@Body() creatUserDto: CreatUserDto){
        console.log(creatUserDto)


        password(creatUserDto.passwordHash).hash( async (err, hash)=>{
            creatUserDto.passwordHash = hash;
            console.log(creatUserDto);
            const user = await this.userModel.create(creatUserDto);
        });

        
    }
}