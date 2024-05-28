import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common/pipes';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    rawBody: true,
  });

  app.enableCors({
    origin: process.env.NODE_ENV === 'production' ? [process.env.DOMAIN] : true,
    methods: ['GET', 'PATCH', 'PUT', 'POST', 'DELETE', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  if (process.env.NODE_ENV === 'development') {
    const swagger = new DocumentBuilder()
      .setTitle('Api for Bartnikas')
      .setDescription('The Bartnikas API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, swagger);

    SwaggerModule.setup('swagger', app, document);
  }

  await app.listen(3000, async () => {
    console.log(`App starting on ${await app.getUrl()}`);
  });
}
bootstrap();
