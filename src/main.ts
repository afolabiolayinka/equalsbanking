import { NestFactory } from '@nestjs/core';
//import { ValidationPipe } from '@nestjs/common';
import {CustomValidationPipe} from './pipe/customValidation.pipe'
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*app.useGlobalPipes(new CustomValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true,
    disableErrorMessages: false,
    validationError: { target: true, value: false }
  }));*/
  app.useGlobalPipes(new CustomValidationPipe());
  await app.listen(3000);
}
bootstrap();
