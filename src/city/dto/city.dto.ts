import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class CityDto{
    @IsMongoId()
    _id: string;

    @IsNotEmpty()
    @IsString()
    name: string;
}