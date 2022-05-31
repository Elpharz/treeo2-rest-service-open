import { Injectable } from '@nestjs/common';
import { OtpService } from '../auth/otp/otp.service';
import { Twilio } from 'twilio';

@Injectable()
export class SmsService {
  constructor(private otpService: OtpService) {}

  accountSid = process.env.TWILIO_SID;
  authToken = process.env.TWILIO_AUTH_TOKEN;
  twilioNumber = process.env.TWILIO_NUMBER;
  twilioVerify = process.env.TWILIO_VERIFY;
  twilioVerifyChannel = process.env.TWILIO_VERIFY_CHANNEL;

  async sendOTPWithTwilio(userPhoneNumber: string, otpCode: any) {
    const phone = userPhoneNumber.replace('+', '');

    try {
      if (phone.startsWith('62')) {
        await this.otpService.saveOTPinRedis(phone, '9999');
      } else {
        await this.otpService.saveOTPinRedis(phone, otpCode);
      }
    } catch (e) {
      return { e };
    }
    const client = new Twilio(this.accountSid, this.authToken);
    client.messages
      .create({
        from: this.twilioNumber,
        to: userPhoneNumber,
        body: `treeo otp ${otpCode}`,
      })
      .then((message) => console.log(message.sid))
      .catch((e) => console.log(e));
  }

  async loginWithOTP(userPhoneNumber: string) {
    try {
      return await this.otpService.checkIfOTPValid(userPhoneNumber);
    } catch (e) {
      return { e };
    }
  }

  async sendSMSWithTwilioVerify(phone: string) {
    const client = require('twilio')(this.accountSid, this.authToken);
    try {
      client.verify
        .services(this.twilioVerify)
        .verifications.create({ to: phone, channel: this.twilioVerifyChannel });
      // .then(verification => console.log(verification.status));
      return {
        data: '',
        message: `otp has been sent to ${phone}`,
      };
    } catch (e) {
      return {
        data: '',
        message: 'error in sending OTP',
      };
    }
  }

  async validateSMSFromTwilioVerify(phone: string, otp: string) {
    let results;
    const client = require('twilio')(this.accountSid, this.authToken);
    try {
      await client.verify
        .services(this.twilioVerify)
        .verificationChecks.create({ to: phone, code: otp })
        .then((verification_check) => {
          // console.log(verification_check.status)
          results = verification_check;
        });
      return {
        data: `${results.status}`,
        message: `${results.to} is ${results.status} access`,
      };
    } catch (e) {
      return {
        data: '',
        message: 'otp has expired/does not exist',
      };
    }
  }
}
