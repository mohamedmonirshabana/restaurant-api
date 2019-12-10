import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/user/schema/user.schema";
import { AuthController } from "./auth.controller";

@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name:"User", schema: UserSchema
            }
        ])
    ],
    controllers:[
        AuthController
    ]
})
export class AuthModule {

}