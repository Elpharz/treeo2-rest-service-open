import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { UsersService } from './../../users/users.service';
import { OAuth2Client } from 'google-auth-library';
import { JwtService } from '@nestjs/jwt';
import { User, UserError } from '../interfaces/google.service.interface';
import { AuthService } from './../auth.service';

@Injectable()
export class GoogleService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  async authenticateUser(request: any): Promise<User | UserError> {
    let email_verified = false;
    const clientId =
      request.body.authType === 'mobile'
        ? process.env.GOOGLE_MOBILE_CLIENT_ID
        : process.env.GOOGLE_CLIENT_ID;
    let user = {};

    const client = new OAuth2Client(clientId);
    const token = request.body.googleAuthToken;
    try {
      async function verifyGoogleIdToken() {
        const ticket = await client.verifyIdToken({
          idToken: token,
          audience: clientId,
        });
        const payload = ticket.getPayload();
        email_verified = payload['email_verified'];
        user = {
          email: payload['email'],
          name: payload['name'],
          firstName:
            payload['family_name'] === undefined
              ? payload['name']
              : payload['family_name'],
          lastName:
            payload['given_name'] === undefined
              ? payload['name']
              : payload['given_name'],
        };
        return user;
      }
      let result: any;
      result = await verifyGoogleIdToken();
      return { status: 'success', data: result };
    } catch (e) {
      return { status: HttpStatus.BAD_REQUEST, error: e.message };
    }
  }

  async googleAuth(request: any) {
    const result: any = await this.authenticateUser(request);
    if (result.status === 400) {
      return result;
    }

    let response;
    const email = result.data.email;
    const checkEmail = await this.usersService.findByEmail(email);
    if (checkEmail) {
      const userData = {
        username:
          checkEmail.username === null
            ? checkEmail.firstName
            : checkEmail.username,
        email: checkEmail.email,
        id: checkEmail.id,
      };

      const accessToken = this.authService.getJwtAccessToken(userData);
      const refreshToken = this.authService.getJwtRefreshToken(userData);
      await this.usersService.setCurrentRefreshToken(refreshToken, email);
      request.res.setHeader('RefreshToken', refreshToken);

      return {
        userName: result.data.firstName,
        email: result.data.email,
        token: accessToken,
        status: HttpStatus.OK,
      };
    } else {
      result.data.password = Math.random().toString(36).slice(2);
      result.data.preferedLogin = 'google';
      result.data.isActive = true;
      result.data.status = 'active';
      response = await this.usersService.createUser(result.data, 'google');

      const accessToken = this.authService.getJwtAccessToken(response);
      const refreshToken = this.authService.getJwtRefreshToken(response);
      await this.usersService.setCurrentRefreshToken(refreshToken, email);
      request.res.setHeader('RefreshToken', refreshToken);

      return {
        userName: response.firstName,
        email: response.email,
        token: accessToken,
        status: HttpStatus.CREATED,
      };
    }
  }
}
