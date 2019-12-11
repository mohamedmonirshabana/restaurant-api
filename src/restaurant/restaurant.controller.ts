import { Controller, Get, Param, Delete, Body, Put, Post, UseGuards, UseInterceptors, UploadedFile } from "@nestjs/common";
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

@Controller('restaurants')
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
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
          destination: './uploads'
          , filename: (req, file, cb) => {
            // Generating a 32 random chars long string
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
            //Calling the callback passing the random name generated with the original extension name
            cb(null, `${randomName}${extname(file.originalname)}`)
          }
        })
      }))
    addRestaurant(@Body() restaurant: RestaurantDto, @UploadedFile() file){
        restaurant.image = file.filename;
        return this.restaurantDB.addRestaurant(restaurant);
    }

    @Get()
    //@UseGuards(AuthenticationGuard, AdminGuard, UserGuard)
    async getRestaurantByLocation(@Body('lat')lat: number,@Body('long')long: number){
        return await this.restaurantDB.searchbyNearLocation(lat,long);
    }
    

}