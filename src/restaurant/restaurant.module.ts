import { Module } from "@nestjs/common";
import { RestaurantService } from "./restaurant.service";
import { RestaurantController } from "./restaurant.controller";
import { RestaurantSchema } from './schema/restaurant.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports:[
        MongooseModule.forFeature([
            {name: "Restaurant", schema: RestaurantSchema}
        ]),
    ],
    controllers:[RestaurantController],
    providers:[RestaurantService]
})
export class RestaurantModule{}