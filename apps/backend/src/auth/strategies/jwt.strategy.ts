import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Ensure that the token expiration is considered
      secretOrKey: process.env.JWT_SECRET, // The secret key used to sign the JWT (from your environment variables)
    });
  }

  // Validate function: This will return the decoded JWT payload
  async validate(payload: any) {
    return { id: payload.sub, email: payload.email }; // Customize based on your JWT payload structure
  }
}
