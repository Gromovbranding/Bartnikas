import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const isDev = process.env.NODE_ENV === 'development';

isDev && dotenvConfig({ path: '.env.local' });

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: `${process.env.DATABASE_HOST}`,
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: `${process.env.POSTGRES_USER}`,
  password: `${process.env.POSTGRES_PASSWORD}`,
  database: `${process.env.POSTGRES_DB}`,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: false,
};

export default registerAs('database', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
