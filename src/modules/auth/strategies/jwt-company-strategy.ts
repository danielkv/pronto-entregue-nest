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
            passReqToCallback: true,
        });
    }

    validate(req, payload: CompanyUserTokenPayload): CompanyUserTokenPayload {
        // populate req.company with payload
        req.company = { userId: payload.userId, companyId: payload.companyId, roles: payload.roles };

        // return
        return req.company;
    }
}
