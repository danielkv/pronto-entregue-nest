import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { configService } from 'src/config/config.service';
import { CompanyUserTokenPayload } from '../interfaces/company-user-token-payload.interface';

@Injectable()
export class JwtCompanyStrategy extends PassportStrategy(Strategy, 'jwt-company') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('companyauthorization'),
            ignoreExpiration: true,
            secretOrKey: configService.getValue('ACCESS_TOKEN_SECRET'),
        });
    }

    validate(payload: CompanyUserTokenPayload): CompanyUserTokenPayload {
        return { userId: payload.userId, companyId: payload.userId, permissions: payload.permissions };
    }
}
