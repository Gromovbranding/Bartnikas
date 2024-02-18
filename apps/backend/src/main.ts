import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common/pipes';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'https://stanislavbartnikas.com',
    ],
    methods: ['GET', 'PATCH', 'PUT', 'POST', 'DELETE', 'HEAD', 'OPTIONS'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  if (process.env.NODE_ENV === 'development' || process.env.DEBUG) {
    const swagger = new DocumentBuilder()
      .setTitle('Api for Bartnikas')
      .setDescription('The Bartnikas API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, swagger);

    SwaggerModule.setup('swagger', app, document);
  }

  await app.listen(Number(process.env.APP_PORT), async () => {
    console.log(`App starting on ${await app.getUrl()}`);
  });
}
bootstrap();
