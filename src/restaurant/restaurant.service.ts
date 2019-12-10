import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Restaurant } from "./model/restaurant";
import { RestaurantDto } from "./dto/restaurant.dto";
import { RestaurantUpdateDto } from "./dto/restaurantupdate.dto";

@Injectable()
export class RestaurantService{
    constructor(@InjectModel('Restaurant') private restaurantModel: Model<Restaurant> ){}

    async addRestaurant(restaurantData: RestaurantDto): Promise<Restaurant>{
        
        const newRestaurant = new this.restaurantModel({ 
            city: restaurantData.city,
            name: restaurantData.name,
            email: restaurantData.email,
            image: restaurantData.image,
            location: { "type": "Point", "coordinates": [+restaurantData.long, +restaurantData.lat]}
        });
        const createdRes = await newRestaurant.save();
        return createdRes;
        
    }

    async updateRestaurant(restaurantId: string, restaurant: RestaurantUpdateDto): Promise<Restaurant>{
        return  await this.restaurantModel.findOneAndUpdate({_id: restaurantId}, restaurant, {new : true} );

    }

    async updateLocation (restaurantId: string , lat: number, long: number): Promise<Restaurant>{
        const restaurantData = this.restaurantModel.findOne({_id: restaurantId});
        (await restaurantData).location.coordinates = [long , lat];
        (await restaurantData).save();
        return restaurantData;
    }

    deleteReastaurant(restaurantId: string){
        this.restaurantModel.findOneAndDelete({_id:restaurantId});
    }

    async getRestaurantByCity(CityID: string): Promise<Restaurant[]>{

        return this.restaurantModel.find({"city": CityID});
    }

    async restaurantDetail(id: string): Promise<Restaurant>{
        return await this.restaurantModel.findOne({_id:id});
    }

    async deleteRestaurant(id: string): Promise<Restaurant>{
        return await this.restaurantModel.findOneAndDelete({_id:id});

    }
    async searchbyNearLocation(lat: number, long: number): Promise<Restaurant[]>{
        return this.restaurantModel.find({
            location:{
                $near :{
                    $geometry: { type: "Point",  coordinates: [ +long, +lat ] },
                    $minDistance: 1000,
                    $maxDistance: 5000
                }
            }
        });

    }


}