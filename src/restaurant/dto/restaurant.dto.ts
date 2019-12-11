import{ IsNotEmpty, IsString, IsEmail, IsMongoId, IsNumber } from 'class-validator';
import {Type} from "class-transformer";

export class RestaurantDto {
    @IsMongoId()
    _id: string;
    
    @IsNotEmpty()
    city: string;

    //@IsNotEmpty()
    //@IsString()
    image: string

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsNumber()
    @Type(()=> Number)
    lat: number;

    @IsNumber()
    @Type(()=> Number)
    long: number;


}