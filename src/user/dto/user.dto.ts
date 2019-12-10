import { IsNotEmpty, IsString, IsMongoId, IsEmail } from "class-validator";

export class UserDto{
    @IsMongoId()
    _id: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    passwordHash: string;

    @IsNotEmpty()
    roles: [];

}