import{ IsNotEmpty, IsString, IsEmail, IsMongoId, IsNumber } from 'class-validator';

export class RestaurantDto {
    @IsMongoId()
    _id: string;
    
    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    @IsString()
    image: string

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsNumber()
    lat: number;

    @IsNumber()
    long: number;


}