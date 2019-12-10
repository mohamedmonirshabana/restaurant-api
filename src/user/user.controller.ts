import { Controller, Body, Get, UseGuards, Param, Put } from "@nestjs/common";
import { User } from "./model/user";
import { UserDto } from "./dto/user.dto";
import { UserService } from './user.service';
import { AuthenticationGuard } from '../guards/authentication.guard';
import { UpdateUserDto } from "./dto/updateuser.dto";

@Controller("user")
export class UserController {
    constructor(private readonly userDB: UserService){}

    @Get(':id')
    async profile(@Param('id')id: string){
        return await this.userDB.profile(id);
    }

    @Put(':id')
    async updateData(@Param('id')id: string, @Body()userBody: UpdateUserDto){
        return await this.userDB.updateProfileData(id,userBody);
    }

    @Get(':id')
    async updatePassword(@Param('id')id: string,oldPassword:string, NewPAssword:string){
        return this.userDB.changePassword(id,oldPassword,NewPAssword);
    }

}