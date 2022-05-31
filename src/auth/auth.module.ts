import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
//import { FacebookStrategy } from './facebookStrategy/facebook.strategy';
import { GoogleService } from './googleStrategy/google.service';
import { SmsService } from '../sms/sms.service';
import { OtpService } from '../auth/otp/otp.service';
import { JwtRefreshTokenStrategy } from './jwt.refresh.token.strategy';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: process.env.JWT_EXPIRY },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    GoogleService,
    //FacebookStrategy,
    JwtRefreshTokenStrategy,
    SmsService,
    OtpService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
