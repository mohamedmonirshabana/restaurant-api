import { Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { City } from './model/city';
import { CityDto } from './dto/city.dto'; 

@Injectable()
export class CityService{

    constructor(@InjectModel('City') private cityModel: Model<City>){}
    
    async findAll(): Promise<City[]>{
        return this.cityModel.find();
    }

    async addNewCity (city : CityDto){
        const newCity =  new this.cityModel(city);

        console.log(newCity);

        await newCity.save();

        return newCity;
        //return newCity.toObject({versionKey: false});

    }

    async updateCity(cityId: string, cityData: string){
        
        return await this.cityModel.findOneAndUpdate({_id: cityId},{name: cityData}, {new:true});
    }

    async GetOneCity(cityId: string): Promise<City>{
        return this.cityModel.findOne({_id:cityId});
    }

    
    
}