import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: process.env.FRONT_URL,
    credentials: true,
  });

  app.setGlobalPrefix('api');
  app.use(cookieParser());
  
  const config = new DocumentBuilder()
    .setTitle('Visitas')
    .setDescription('Api visitas')
    .setVersion('1.0')
    .addCookieAuth('token')
    .build();
    
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true }
  }));
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
