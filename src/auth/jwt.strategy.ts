import { HttpException, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    return { username: payload.username, email: payload.email, id: payload.id };
  }

  async validatePayload(payload: any, done: VerifiedCallback) {
    const user = await this.authService.validateUserByPayload(payload);
    if (!user) {
      throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
    }
    return done(null, user, payload.iat);
  }
}
