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
    UseFilters, UseGuards
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
        
        return this.cityDB.findAll();
    }
    
    @Get(':id')
    async getCityData(@Param('id') id:string): Promise<City>{
        return this.cityDB.GetOneCity(id);
    }

    @Post()
    @UseGuards(AdminGuard)
    async addCity(@Body() citydto : CityDto): Promise<City>{
        return this.cityDB.addNewCity(citydto);
    }

    // @Put(':id')
    // async updateCity(@Param('id')id: string, @Body() cityData: CityDto): Promise<City>{
    //     return this.cityDB.updateCity(id, cityData);
    // }
    
}