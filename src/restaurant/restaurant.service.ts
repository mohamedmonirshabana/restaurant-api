import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Restaurant } from "./model/restaurant";
import { RestaurantDto } from "./dto/restaurant.dto";

@Injectable()
export class RestaurantService{
    constructor(@InjectModel('Restaurant') private restaurantModel: Model<Restaurant, {}> ){}

    async addRestaurant(restaurantData: RestaurantDto): Promise<Restaurant>{
        
        
        //  const newRestaurant = this.restaurantModel();
        //  const createdRes = await newRestaurant.save();
        //  return createdRes;
        
    }

}