import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { CityModule } from './city/city.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONNECTION } from './constants';
import { RestaurantModule } from './restaurant/restaurant.module';
import { AuthModule } from './auth/auth.module';
import { GetUserMiddleware } from './middleware/get-user.middleware'
import { RestaurantController } from './restaurant/restaurant.controller';
import { CityController } from './city/city.controller';

@Module({
  imports: [
    CityModule,
    RestaurantModule,
    AuthModule,
    MongooseModule.forRoot(MONGO_CONNECTION,{ useNewUrlParser: true, useUnifiedTopology: true })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  
  configure(consumer: MiddlewareConsumer): void{
    consumer
        .apply(GetUserMiddleware)
        .forRoutes(
          RestaurantController,
          CityController,
        );
  }
}
