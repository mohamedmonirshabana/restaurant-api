import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { CitySchema } from './schema/city.schema';
import { CityController } from "./city.controller";
import { CityService } from "./city.service";

@Module({
    imports:[
        MongooseModule.forFeature([
            {name: "City", schema: CitySchema },
        ])
    ],
    controllers:[CityController],
    providers: [CityService]
})
export class CityModule{}