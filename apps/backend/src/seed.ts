import { NestFactory } from '@nestjs/core';
import { SeederService } from './seeder.service';
import { SeederModule } from './seeder.module';

async function bootstrap() {
  const ctx = await NestFactory.createApplicationContext(SeederModule);
  const seeder = ctx.get(SeederService);

  try {
    await seeder.seed();
  } catch (exc) {
    console.error(exc);
  } finally {
    ctx.close();
  }
}

bootstrap();
