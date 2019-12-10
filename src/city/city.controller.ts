import { Controller, Get, Param, Post, Body, Put } from "@nestjs/common";

import { City } from "./model/city";
import { CityDto } from "./dto/city.dto";
import { CityService } from "./city.service";

@Controller("cities")
export class CityController{
    constructor(private readonly cityDB: CityService){}

    @Get()
    async findAllCity(){
        
        return this.cityDB.findAll();
    }
    
    @Get(':id')
    async getCityData(@Param('id') id:string): Promise<City>{
        return this.cityDB.GetOneCity(id);
    }

    @Post()
    async addCity(@Body() citydto : CityDto): Promise<City>{
        return this.cityDB.addNewCity(citydto);
    }

    // @Put(':id')
    // async updateCity(@Param('id')id: string, @Body() cityData: CityDto): Promise<City>{
    //     return this.cityDB.updateCity(id, cityData);
    // }
    
}