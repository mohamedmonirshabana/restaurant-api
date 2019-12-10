import{ IsNotEmpty, IsString, IsEmail, IsMongoId, IsNumber } from 'class-validator';

export class RestaurantUpdateDto {
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
}