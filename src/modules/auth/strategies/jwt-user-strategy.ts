import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { configService } from 'src/config/config.service';
import { AuthenticatedUser } from '../interfaces/authenticated-user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: !configService.isProduction(),
            secretOrKey: configService.getValue('ACCESS_TOKEN_SECRET'),
        });
    }

    async validate(payload: AuthenticatedUser): Promise<AuthenticatedUser> {
        return { userId: payload.userId, email: payload.email, permissions: payload.permissions };
    }
}
