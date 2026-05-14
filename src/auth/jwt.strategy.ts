import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
const jwtSecret = configService.get<string>('JWT_SECRET');

    // Validasi tambahan: Jika secret tidak ada, aplikasi tidak akan jalan
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in .env file');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret, // memberitahu TypeScript ini pasti string
    });
  }

  async validate(payload: any) {
    // Data yang dikembalikan di sini akan otomatis masuk ke req.user
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}