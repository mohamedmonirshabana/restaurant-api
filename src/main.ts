import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http.filter';
import { FallbackExceptionFilter } from './filters/fallback.filter';
import * as mongoose from 'mongoose';
import { ValidationError, ValidationPipe } from "@nestjs/common";
import { ValidationFilter } from './filters/validation.filter';
import { ValidationException } from './filters/validation.exception';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

mongoose.set('useFindAndModify', false);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.useGlobalFilters(
    new FallbackExceptionFilter(),
    new HttpExceptionFilter(),
    new ValidationFilter()
  );

  app.useGlobalPipes(new ValidationPipe({
    skipMissingProperties: true,
    exceptionFactory:(errors: ValidationError[]) =>{
      const message = errors.map(
        error=> `${error.property}has wrong value ${error.value},
        ${Object.values(error.constraints).join(',')}`
      );
      return new ValidationException(message);
    }
  }));

  const options = new DocumentBuilder()
  .setTitle('Restaurant API')
  .setDescription('The Restaurant API description')
  .setVersion('1.0')
  .build();
const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup('api/docs', app, document);
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
