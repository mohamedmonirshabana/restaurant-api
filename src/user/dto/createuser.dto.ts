import { IsNotEmpty, IsString, IsMongoId, IsEmail } from "class-validator";

export class CreatUserDto{
    @IsEmail()
    email: string;
    @IsString()
    name: string;
    @IsString()
    passwordHash: string;

    roles: [];

}