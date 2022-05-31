import { redis } from './redis';
import { v4 as uuidv4 } from 'uuid';

export const confirmEmailLink = async (userID: string) => {
  const ID = uuidv4();
  await redis.set(ID, userID, 'ex', 60 * 60 * 15);
  const PORT = process.env.PORT;
  // return `http://localhost:${PORT}/users/confirm/${ID}`;
  return `https://treeo-webapp-develop.xyz/confirm_email/${ID}`;
};
