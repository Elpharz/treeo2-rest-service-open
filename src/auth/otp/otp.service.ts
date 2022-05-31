import { Injectable } from '@nestjs/common';
import { redis } from '../../mailer/redis';

@Injectable()
export class OtpService {
  async saveOTPinRedis(userPhoneNumber: string, code: any) {
    return redis.set(userPhoneNumber, code, 'ex', 60 * 10);
  }

  async checkIfOTPValid(userPhoneNumber: string) {
    return redis.get(userPhoneNumber);
  }
}
