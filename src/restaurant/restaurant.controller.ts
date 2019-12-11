import { Controller, Get, Param, Delete, Body, Put, Post, UseGuards, UseInterceptors, UploadedFile, Query } from "@nestjs/common";
import { RestaurantService } from "./restaurant.service";
import { RestaurantUpdateDto } from "./dto/restaurantupdate.dto";
import { RestaurantDto } from "./dto/restaurant.dto";
import { AuthenticationGuard } from '../guards/authentication.guard';
import { AdminGuard } from '../guards/admin.guard';
import { UserGuard } from '../guards/user.guard';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { useContainer } from "class-validator";
import { async } from "rxjs/internal/scheduler/async";

@Controller('restaurants')
@UseGuards(AuthenticationGuard)
export class RestaurantController{
    constructor( private readonly restaurantDB: RestaurantService ){}
    //@UseGuards(AuthenticationGuard, AdminGuard, UserGuard)
    @Get('search')
    async getRestaurantByLocation(@Query('lat')lat: number,@Query('long')long: number){
        // console.log("lat is ", lat);
        // console.log("long is ", long);
        return await this.restaurantDB.searchbyNearLocation(lat,long);
    }

    @Put('updateInfo/:id')
    @UseGuards(AdminGuard)
    updaterestaurantInfo(@Param('id')id: string, @Body() info: RestaurantUpdateDto){
        return this.restaurantDB.updateRestaurant(id, info);
    }

    @Put('updatelocation/:id')
    @UseGuards(AdminGuard)
    updteLocation(@Param('id')id:string, lat:number, long:number){
        return this.restaurantDB.updateLocation(id,lat,long);
    }

    @Get(":cityID")
    getrestaurantByCity(@Param('cityID')cid: string){
        return this.restaurantDB.getRestaurantByCity(cid);
    }
    @Delete(':id')
    @UseGuards(AdminGuard)
    deleteRestaurant(@Param('id')id: string){
        return this.restaurantDB.deleteRestaurant(id);
    }


    @Post()
    @UseGuards(AdminGuard)
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
          destination: './uploads'
          , filename:  (req, file, cb) => {
            // Generating a 32 random chars long string
            const randomName =  Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
            //Calling the callback passing the random name generated with the original extension name
            cb(null, `${randomName}${extname(file.originalname)}`)
          }
        })
      }))
    async addRestaurant(@Body() restaurant: RestaurantDto, @UploadedFile() file){
        // console.log("res Data => ", restaurant);
        // console.log("---------------------------");
        // console.log(" my file upload ", file);
        restaurant.image = file.filename;
        return await this.restaurantDB.addRestaurant(restaurant);
    }



}