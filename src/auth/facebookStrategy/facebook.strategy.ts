import { Injectable } from '@nestjs/common';
import * as FacebookTokenStrategy from 'passport-facebook-token';
import { use } from 'passport';

@Injectable()
export class FacebookStrategy {
  constructor() {
    this.init();
  }
  init() {
    use(
      new FacebookTokenStrategy(
        {
          clientID: process.env.FACEBOOK_APP_ID || 'test',
          clientSecret: process.env.FACEBOOK_APP_SECRET,
        },
        async (
          accessToken: string,
          refreshToken: string,
          profile: any,
          done: any,
        ) => {
          const { first_name, last_name, email } = profile._json;
          const user = {
            email: email,
            firstName: first_name,
            lastName: last_name,
          };
          return done(null, user);
        },
      ),
    );
  }
}
