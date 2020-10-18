import { Body, Controller, Get, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { Company } from '../../company-association/company/entities/company.entity';
import { LoginCompanyDTO } from '../dtos/login-company.dto';
import { JwtCompanyAuthGuard } from '../guards/jwt-company-auth.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { LoginCompanyService } from '../services/login-company.service';
import { LoginUserService } from '../services/login-user.service';
import { ACLResourcesEnum } from '../acl/resources.enum';
import { PopulateRoles } from '../guards/popolate-roles.guard';
import { UseRoles } from 'nest-access-control';

@Controller()
export class AuthController {
    constructor(private loginUserService: LoginUserService, private loginCompanyService: LoginCompanyService) {}

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        return this.loginUserService.execute(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('select/company')
    async selectCompany(
        @Request() req,
        @Body('companyId', ParseIntPipe) companyId: Company['id'],
    ): Promise<LoginCompanyDTO> {
        return this.loginCompanyService.execute(companyId, req?.user?.userId);
    }

    @UseGuards(JwtAuthGuard, JwtCompanyAuthGuard, PopulateRoles)
    @Get('session')
    async getSession(@Request() req) {
        return { user: req.user, company: req.company };
    }

    @UseGuards(JwtAuthGuard, JwtCompanyAuthGuard, PopulateRoles)
    @UseRoles({
        action: 'update',
        possession: 'any',
        resource: ACLResourcesEnum.USER,
    })
    @Get('test')
    async testRole() {
        return { permit: true };
    }
}
