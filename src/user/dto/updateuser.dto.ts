import { IsNotEmpty, IsString, IsMongoId, IsEmail } from "class-validator";

export class UpdateUserDto{
    @IsMongoId()
    _id: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    name: string;

}