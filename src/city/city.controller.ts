import { 
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    NotFoundException,
    Param,
    Post,
    Put,
    Req,
    Res,
    UseFilters, UseGuards, Bind
} from "@nestjs/common";

import { City } from "./model/city";
import { CityDto } from "./dto/city.dto";
import { CityService } from "./city.service";
import { AuthenticationGuard } from '../guards/authentication.guard';
import { AdminGuard } from '../guards/admin.guard';
import { UserGuard } from '../guards/user.guard';

@Controller("cities")
@UseGuards(AuthenticationGuard)
export class CityController{
    constructor(private readonly cityDB: CityService){}

    @Get()
    async findAllCity(){
        
        return await this.cityDB.findAll();
    }
    
    @Get(':id')
    async getCityData(@Param('id') id:string): Promise<City>{
        return this.cityDB.GetOneCity(id);
    }

    //@UseGuards(AdminGuard)
    @Post()
    @UseGuards(AdminGuard)
    async addCity(@Body() cityDto: CityDto  ){
        //console.log("body=>", cityDto);
        //console.log("DTO Data is :",cityDto);
        return this.cityDB.addNewCity(cityDto);
    }

    @Put(':id')
    @UseGuards(AdminGuard)
    async updateCity(@Param('id')id: string, @Body('name') cityData: string){
        return await this.cityDB.updateCity(id, cityData);
    }
    
}