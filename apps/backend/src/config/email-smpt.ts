import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';

const isDev = process.env.NODE_ENV === 'development';

isDev && dotenvConfig({ path: '.env.local' });

export default registerAs('email-smtp', () => ({
  transport: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    requireTLS: true,
    tls: {
      ciphers: 'SSLv3',
    },
    auth: {
      user: process.env.EMAIL_LOGIN,
      pass: process.env.EMAIL_PASSWORD,
    },
  },
}));
