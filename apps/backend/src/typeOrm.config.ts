import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

const { parsed: env } = config({
  path: `.env.${process.env.NODE_ENV}`,
});

const cfgConnectTypeOrm = {
  type: <'postgres'>env.DATABASE_TYPE,
  database: env.DATABASE_NAME,
  host: env.DATABASE_HOST,
  port: Number(env.DATABASE_PORT),
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
};

export default new DataSource({
  ...cfgConnectTypeOrm,
  entities: ['./**/*.entity.ts'],
  migrations: ['./**/*___new-migration___.ts'],
});

export const TypeOrmConfig = TypeOrmModule.forRoot({
  ...cfgConnectTypeOrm,
  autoLoadEntities: true,
  synchronize: env.NODE_ENV === 'development',
});
