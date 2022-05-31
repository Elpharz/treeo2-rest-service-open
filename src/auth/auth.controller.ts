import {
  Controller,
  Req,
  Post,
  UseGuards,
  Get,
  Body,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { GoogleService } from './googleStrategy/google.service';
import {
  ApiOkResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiBody,
} from '@nestjs/swagger';
import JwtRefreshGuard from './jwt-refresh.gaurd';
import { SmsService } from '../sms/sms.service';
import { LoginDTO } from '../users/dto/create-userDTO';
import { RequestOtpDTO, VerifyOtpDTO } from '../auth/dto/otpDTO';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private authService: AuthService,
    private googleService: GoogleService,
    private smsService: SmsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOkResponse({ description: 'Get user profile' })
  async profile(@Req() req) {
    return { user: req.user };
  }

  @Post('login')
  @HttpCode(200)
  @ApiOkResponse({ description: 'User login using email and password' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBody({ type: LoginDTO })
  async login(@Body() userData: LoginDTO, @Req() Req) {
    const user = await this.authService.validateUser(
      userData['email'],
      userData['password'],
    );
    if (user) {
      const payload = {
        username: user.username,
        email: user.email,
        id: user.id,
      };
      const accessToken = this.authService.getJwtAccessToken(payload);
      const refreshToken = this.authService.getJwtRefreshToken(payload);
      await this.userService.setCurrentRefreshToken(refreshToken, user.email);
      Req.res.setHeader('RefreshToken', refreshToken);

      return {
        data: {
          username: user.username,
          email: user.email,
          userId: user.id,
          token: accessToken,
        },
        message: 'success',
      };
    }
    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }

  @UseGuards(AuthGuard('facebook-token'))
  @Get('facebook')
  @ApiOkResponse({
    description: 'Get user profile and token after facebook login',
  })
  async getTokenAfterFacebookSignIn(@Req() req) {
    const user = await this.userService.CheckOrCreateUserUsingFacebookProfile(
      req.user,
    );
    const { email, firstName, lastName, username } = user;

    const loginData = {
      username,
      email,
    };

    const accessToken = this.authService.getJwtAccessToken(loginData);
    const refreshToken = this.authService.getJwtRefreshToken(loginData);
    await this.userService.setCurrentRefreshToken(refreshToken, email);
    req.res.setHeader('RefreshToken', refreshToken);

    const response = {
      statusCode: HttpStatus.OK,
      email,
      firstName,
      lastName,
      username,
      token: accessToken,
    };

    return response;
  }

  @Post('google')
  @ApiOkResponse({
    description: 'Google Authentication',
  })
  @ApiBody({})
  async googleAuth(@Req() Req) {
    const res = await this.googleService.googleAuth(Req);
    if (res.status === 400) {
      throw new HttpException(res.error, HttpStatus.BAD_REQUEST);
    }
    return res;
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Get refresh token' })
  @ApiUnauthorizedResponse()
  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refresh(@Req() Req) {
    const res = await this.userService.getUserIfRefreshTokenMatches(
      Req.user.token,
      Req.user.id,
    );
    const AccessToken = this.authService.getJwtAccessToken(res);
    const refreshToken = this.authService.getJwtRefreshToken(res);
    await this.userService.setCurrentRefreshToken(refreshToken, res.email);
    Req.res.setHeader('RefreshToken', refreshToken);
    return { AccessToken };
  }

  @Get('/logout')
  @ApiOkResponse({
    description: 'Logout user',
  })
  async logoutUser(@Req() Req) {
    const res = await this.userService.logoutUser(Req);
    if (!Req.headers.token) {
      throw new HttpException('Token is required', HttpStatus.BAD_REQUEST);
    }
    const decodedToken: any = await this.jwtService.decode(Req.headers.token);
    if (!decodedToken || !decodedToken.id) {
      throw new HttpException('Not a valid token', HttpStatus.BAD_REQUEST);
    }
    await this.userService.removeRefreshToken(decodedToken.id);
    return res;
  }

  @ApiOkResponse({
    description: 'Validate user phone number',
  })
  @Get('validate-phonenumber/:phone')
  async validateUserPhoneNumber(@Param('phone') userPhone: string) {
    return this.authService.validateUserPhoneNumber(userPhone);
  }

  @ApiOkResponse({
    description: 'Validate user phone number using otp',
  })
  @Post('validate-mobile-user')
  async validateMobileUser(@Body() confirmUser: any, @Req() Req) {
    confirmUser.phoneNumber = confirmUser.phoneNumber.replace('+', '').trim();
    const user = await this.userService.confirmUserFromPhoneNumber(
      confirmUser.phoneNumber,
      confirmUser.code,
    );

    const payload = {
      username: user.username,
      email: user?.email,
      id: user.id,
    };

    const accessToken = this.authService.getJwtAccessToken(payload);
    const refreshToken = this.authService.getJwtRefreshToken(payload);
    await this.userService.setCurrentRefreshToken(
      refreshToken,
      confirmUser.phoneNumber,
    );
    Req.res.setHeader('RefreshToken', refreshToken);

    return {
      data: {
        username: user.username,
        email: user?.email,
        userId: user.id,
        token: accessToken,
        refreshToken: refreshToken,
      },
      message: `+${confirmUser.phoneNumber} has been activated`,
    };
  }

  @Post('request-otp')
  async requestOTP(@Body() requestBody: RequestOtpDTO) {
    const otpCode = this.userService.generateFourDigitCode();
    const { phoneNumber } = requestBody;

    const phone = this.userService.removePlus(phoneNumber);
    const checkPhonenumber = this.userService.checkValidNumber(phone);
    if (!checkPhonenumber) {
      throw new NotFoundException('Add a valid PhoneNumber');
    }
    const user = await this.userService.findByPhoneNumber(phone);

    if (user) {
      await this.smsService.sendOTPWithTwilio(phoneNumber, otpCode);
    }

    return {
      data: '',
      message: 'OTP sent successfully',
    };
  }

  @Post('verify-otp')
  async verifyOTP(@Body() requestBody: VerifyOtpDTO, @Req() Req) {
    const { code, phoneNumber } = requestBody;
    const phone = this.userService.removePlus(phoneNumber);
    const checkPhonenumber = this.userService.checkValidNumber(phone);
    if (!checkPhonenumber) {
      throw new NotFoundException('Add a valid PhoneNumber');
    }
    const originalCode = await this.smsService.loginWithOTP(phone);

    const user = await this.userService.findByPhoneNumber(phone);

    if (!user.isActive) {
      throw new HttpException('User not active', HttpStatus.BAD_REQUEST);
    }
    const payload = {
      username: user.username,
      email: user?.email,
      id: user.id,
    };
    const accessToken = this.authService.getJwtAccessToken(payload);
    const refreshToken = this.authService.getJwtRefreshToken(payload);
    await this.userService.setCurrentRefreshTokenMobile(refreshToken, phone);
    Req.res.setHeader('RefreshToken', refreshToken);

    if (originalCode !== code) {
      throw new NotFoundException('wrong otp code supplied');
    }
    return {
      data: {
        username: user.username,
        email: user?.email,
        userId: user.id,
        token: accessToken,
        refreshToken: refreshToken,
      },
      message: 'success',
    };
  }

  @Post('twilio/verify')
  async sendSMSWithTwilioVerify(@Body() requestBody: any, @Req() Req) {
    return this.smsService.sendSMSWithTwilioVerify(requestBody.phoneNumber);
  }

  @Post('twilio/verify/otp')
  async validateSMSFromTwilioVerify(@Body() requestBody: any, @Req() Req) {
    return await this.smsService.validateSMSFromTwilioVerify(
      requestBody.phoneNumber,
      requestBody.otp,
    );
    // const result = await this.smsService.validateSMSFromTwilioVerify(requestBody.phoneNumber, requestBody.otp)
    // if (result.data === "approved") {
    //   const phone = this.userService.removePlus(requestBody.phoneNumber);
    //   const user = await this.userService.findByPhoneNumber(phone)
    //   if (!user.isActive) {
    //     throw new HttpException('User not active', HttpStatus.BAD_REQUEST);
    //   }
    //   const payload = {
    //     username: user.username,
    //     email: user?.email,
    //     id: user.id,
    //   };
    //   const accessToken = this.authService.getJwtAccessToken(payload);
    //   const refreshToken = this.authService.getJwtRefreshToken(payload);
    //   await this.userService.setCurrentRefreshTokenMobile(refreshToken, phone);
    //   Req.res.setHeader('RefreshToken', refreshToken);
    //   return {
    //     data: {
    //       username: user.username,
    //       email: user?.email,
    //       userId: user.id,
    //       token: accessToken,
    //       refreshToken: refreshToken,
    //     },
    //     message: 'success',
    //   };
    // }
  }
}
