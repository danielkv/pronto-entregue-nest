import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Company } from 'src/modules/company-association/company/entities/company.entity';
import { User } from 'src/modules/user-association/user/entities/user.entity';
import { LoginCompanyDTO } from '../dtos/login-company.dto';
import { CompanyUserTokenPayload } from '../interfaces/company-user-token-payload.interface';

@Injectable()
export class LoginCompanyService {
    /* constructor(
        private getCompanyUserConnectionService: GetCompanyUserConnectionService,
        private jwtService: JwtService,
    ) {}

    async execute(companyId: Company['id'], userId: User['id']): Promise<LoginCompanyDTO> {
        if (!companyId || !userId) throw new UnauthorizedException();

        const companyUserConnection = await this.getCompanyUserConnectionService.execute(companyId, userId);

        if (!companyUserConnection) throw new UnauthorizedException();

        const payload: CompanyUserTokenPayload = {
            companyId: companyUserConnection.companyId,
            userId: companyUserConnection.userId,
            permissions: companyUserConnection.permissions,
        };

        const companyAccessToken = this.jwtService.sign(payload);

        return { companyAccessToken };
    } */
}
