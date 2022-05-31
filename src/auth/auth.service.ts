import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmailLocal(email);
    const isMatch = await bcrypt.compare(password, user.password);

    if (user.isActive !== true) {
      throw new HttpException('Account Inactive.', HttpStatus.UNAUTHORIZED);
    }

    if (user && !isMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const retUser = {
      email: user.email,
      username: user.username,
      id: user.id,
    };
    return retUser;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async validateUserByPayload(payload: any) {
    return await this.usersService.findByPayload(payload);
  }

  getJwtAccessToken(payload: any) {
    const token = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: '2630000s',
    });
    return token;
  }

  getJwtRefreshToken(payload: any) {
    const token = this.jwtService.sign(payload, {
      secret: jwtConstants.refreshTokenSecret,
      expiresIn: '10520000s',
    });
    return token;
  }

  async validateUserPhoneNumber(userPhone: string) {
    return this.usersService.findByUserPhoneNumber(userPhone);
  }
}
