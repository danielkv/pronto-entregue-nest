import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { configService } from 'src/config/config.service';
import { AuthenticatedCompany } from '../interfaces/authenticated-company.interface';

@Injectable()
export class JwtCompanyStrategy extends PassportStrategy(Strategy, 'jwt-company') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('companyauthorization'),
            ignoreExpiration: !configService.isProduction(),
            secretOrKey: configService.getValue('ACCESS_TOKEN_SECRET'),
            passReqToCallback: true,
        });
    }

    validate(req, payload: AuthenticatedCompany): AuthenticatedCompany {
        // populate req.company with payload
        req.company = { userId: payload.userId, companyId: payload.companyId, permissions: payload.permissions };

        // return
        return req.company;
    }
}
