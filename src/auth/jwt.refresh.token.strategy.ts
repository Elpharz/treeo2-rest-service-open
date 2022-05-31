import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';

export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtConstants.refreshTokenSecret,
      passReqToCallback: true,
    });
  }

  async validate(request: any, payload: any) {
    return {
      token: request.headers.authorization.slice(7),
      email: payload.email,
      id: payload?.id,
    };
  }
}
