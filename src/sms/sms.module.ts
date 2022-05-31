import { Module } from '@nestjs/common';
import { OtpModule } from '../auth/otp/otp.module';
import { SmsService } from './sms.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [OtpModule, UsersModule],
  providers: [SmsService],
  exports: [SmsService],
})
export class SmsModule {}
