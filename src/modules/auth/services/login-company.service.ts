import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CompanyUser } from 'src/modules/company-association/company-user/entities/company.user.entity';
import { Company } from 'src/modules/company-association/company/entities/company.entity';
import { User } from 'src/modules/user-association/user/entities/user.entity';
import { LoginCompanyDTO } from '../dtos/login-company.dto';
import { AuthenticatedCompany } from '../interfaces/authenticated-company.interface';

@Injectable()
export class LoginCompanyService {
    constructor(
        @InjectQueryService(CompanyUser) private companyUserService: QueryService<CompanyUser>,
        private jwtService: JwtService,
    ) {}

    async execute(companyId: Company['id'], userId: User['id']): Promise<LoginCompanyDTO> {
        if (!companyId || !userId) throw new UnauthorizedException();

        const companyUsers = await this.companyUserService.query({
            filter: { companyId: { eq: companyId }, userId: { eq: userId } },
        });

        if (companyUsers.length !== 1) throw new UnauthorizedException();

        const companyUser = companyUsers[0];

        const payload: AuthenticatedCompany = {
            companyId: companyUser.companyId,
            userId: companyUser.userId,
            permissions: companyUser.permissions,
        };

        const companyAccessToken = this.jwtService.sign(payload);

        return { companyAccessToken };
    }
}
