import { Injectable, BadRequestException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./model/user";
import { UserDto } from "./dto/user.dto";
import { UpdateUserDto } from './dto/updateuser.dto';
import * as password from 'password-hash-and-salt';

@Injectable()
export class UserService{
    constructor(@InjectModel('User') private userModel: Model<User>){}

    async profile(id: string): Promise<User>{
        return this.userModel.findOne({_id:id});
    }

    async updateProfileData(uid: string, userdata: UpdateUserDto ){
        return this.userModel.findOneAndUpdate({_id: uid}, userdata, {new:true});
    }
    async changePassword(id:string, oldpassword: string, newpass: string){
        const user = await this.userModel.findOne({_id:id});
        if(!user){
            throw new BadRequestException("your account not exist");
        }
        return new Promise((resolve, reject) =>{
            password(oldpassword).verifyAginst(
                user.passwordHash,
                (err, verified) => {
                    if(!verified){
                        reject(new BadRequestException());
                    }
                    password(newpass).hash((error, hash) =>{
                        user.passwordHash = hash;
                        user.save();
                    })
                    
                }
            )
        });
    }
}