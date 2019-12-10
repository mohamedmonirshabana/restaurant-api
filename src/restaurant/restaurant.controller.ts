import { Controller, Get, Param, Delete, Body, Put, Post } from "@nestjs/common";
import { RestaurantService } from "./restaurant.service";
import { RestaurantUpdateDto } from "./dto/restaurantupdate.dto";
import { RestaurantDto } from "./dto/restaurant.dto";

@Controller('restaurant')
export class RestaurantController{
    constructor( private readonly restaurantDB: RestaurantService ){}

    @Get(":cityID")
    getrestaurantByCity(@Param('cityID')cid: string){
        return this.restaurantDB.getRestaurantByCity(cid);
    }
    @Delete(':id')
    deleteRestaurant(@Param('id')id: string){
        return this.restaurantDB.deleteRestaurant(id);
    }

    @Put(':id')
    updaterestaurantInfo(@Param('id')id: string, @Body() info: RestaurantUpdateDto){
        return this.restaurantDB.updateRestaurant(id, info);
    }

    @Put(':id')
    updteLocation(@Param('id')id:string, lat:number, long:number){
        return this.restaurantDB.updateLocation(id,lat,long);
    }

    @Post()
    addRestaurant(@Body() restaurant: RestaurantDto){
        return this.restaurantDB.addRestaurant(restaurant);
    }

    @Get()
    getRestaurantByLocation(@Body('lat')lat: number,@Body('long')long: number){
        return this.restaurantDB.searchbyNearLocation(lat,long);
    }
    

}