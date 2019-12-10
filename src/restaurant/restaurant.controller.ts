import { Controller, Get, Param, Delete, Body, Put, Post, UseGuards } from "@nestjs/common";
import { RestaurantService } from "./restaurant.service";
import { RestaurantUpdateDto } from "./dto/restaurantupdate.dto";
import { RestaurantDto } from "./dto/restaurant.dto";
import { AuthenticationGuard } from '../guards/authentication.guard';
import { AdminGuard } from '../guards/admin.guard';
import { UserGuard } from '../guards/user.guard';

@Controller('restaurant')
@UseGuards(AuthenticationGuard)
export class RestaurantController{
    constructor( private readonly restaurantDB: RestaurantService ){}

    @Get(":cityID")
    @UseGuards(AdminGuard, UserGuard)
    getrestaurantByCity(@Param('cityID')cid: string){
        return this.restaurantDB.getRestaurantByCity(cid);
    }
    @Delete(':id')
    @UseGuards(AdminGuard)
    deleteRestaurant(@Param('id')id: string){
        return this.restaurantDB.deleteRestaurant(id);
    }

    @Put(':id')
    @UseGuards(AdminGuard)
    updaterestaurantInfo(@Param('id')id: string, @Body() info: RestaurantUpdateDto){
        return this.restaurantDB.updateRestaurant(id, info);
    }

    @Put(':id')
    @UseGuards(AdminGuard)
    updteLocation(@Param('id')id:string, lat:number, long:number){
        return this.restaurantDB.updateLocation(id,lat,long);
    }

    @Post()
    @UseGuards(AdminGuard)
    addRestaurant(@Body() restaurant: RestaurantDto){
        return this.restaurantDB.addRestaurant(restaurant);
    }

    @Get()
    @UseGuards(AdminGuard, UserGuard)
    async getRestaurantByLocation(@Body('lat')lat: number,@Body('long')long: number){
        return await this.restaurantDB.searchbyNearLocation(lat,long);
    }
    

}