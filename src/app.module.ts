import { Module } from '@nestjs/common';
import { CityModule } from './city/city.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONNECTION } from './constants';

@Module({
  imports: [
    CityModule,
    MongooseModule.forRoot(MONGO_CONNECTION)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
