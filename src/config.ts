import 'dotenv/config';

export const {
  PORT = 3000,
  DB_NAME = 'mestodb',
  JWT_SECRET = 'app-super-secret',
} = process.env;
