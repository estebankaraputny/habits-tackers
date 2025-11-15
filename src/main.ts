import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Module,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
