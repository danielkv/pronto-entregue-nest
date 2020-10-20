import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { configService } from 'src/config/config.service';
import { UserTokenPayload } from '../interfaces/user-token-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: !configService.isProduction(),
            secretOrKey: configService.getValue('ACCESS_TOKEN_SECRET'),
        });
    }

    async validate(payload: UserTokenPayload): Promise<UserTokenPayload> {
        return { userId: payload.userId, email: payload.email, permissions: payload.permissions };
    }
}
