import * as dotenv from 'dotenv';
dotenv.config();

export const jwtConstants = {
  secret: process.env.NEST_SECRET,
  refreshTokenSecret: process.env.NEST_REFRESH_SECRET,
};
