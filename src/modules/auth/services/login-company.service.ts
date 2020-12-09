import { Filter, InjectQueryService, QueryService } from '@nestjs-query/core';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CompanyUserDTO } from 'src/modules/company-association/company-user/dtos/company.user.dto';
import { CompanyUser } from 'src/modules/company-association/company-user/entities/company.user.entity';
import { Company } from 'src/modules/company-association/company/entities/company.entity';
import { LoginCompanyDTO } from '../dtos/login-company.dto';
import { AppRoles } from '../enums/app-roles.enum';
import { AuthenticatedCompany } from '../interfaces/authenticated-company.interface';
import { AuthenticatedUser } from '../interfaces/authenticated-user.interface';

@Injectable()
export class LoginCompanyService {
    constructor(
        @InjectQueryService(CompanyUser) private companyUserService: QueryService<CompanyUser>,
        private jwtService: JwtService,
    ) {}

    async execute(companyId: Company['id'], user: AuthenticatedUser): Promise<LoginCompanyDTO> {
        if (!companyId || !user?.userId) throw new UnauthorizedException();

        const filter: Filter<CompanyUserDTO> = { companyId: { eq: companyId }, active: { is: true } };

        if (!user.permissions.includes(AppRoles.MASTER)) filter.userId = { eq: user.userId };

        const companyUsers = await this.companyUserService.query({ filter });

        if (companyUsers.length < 1) throw new UnauthorizedException();

        const companyUser = companyUsers[0];

        const payload: AuthenticatedCompany = {
            companyId: companyUser.companyId,
            userId: user.userId,
            permissions: companyUser.permissions,
        };

        const companyAccessToken = this.jwtService.sign(payload);

        return { companyAccessToken };
    }
}
