import { Body, Controller, Get, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { Company } from '../../company-association/company/entities/company.entity';
import { AuthContext } from '../decorators/auth-context.decorator';
import { LoginCompanyDTO } from '../dtos/login-company.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { IAuthContext } from '../interfaces/guard-roles.interface';
import { LoginCompanyService } from '../services/login-company.service';
import { LoginUserService } from '../services/login-user.service';
import { JwtCompanyAuthGuard } from '../guards/jwt-company-auth.guard';
import { JwtUserAuthGuard } from '../guards/jwt-user-auth.guard';
import { AuthPermissions } from '../decorators/permissions-context.decorator';
import { AppRoles } from '../enums/app-roles.enum';

@Controller()
@UseGuards(JwtUserAuthGuard, JwtCompanyAuthGuard)
export class AuthController {
    constructor(private loginUserService: LoginUserService, private loginCompanyService: LoginCompanyService) {}

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        return this.loginUserService.execute(req.user);
    }

    @Post('select/company')
    async selectCompany(
        @AuthContext() ctx: IAuthContext,
        @Body('companyId', ParseIntPipe) companyId: Company['id'],
    ): Promise<LoginCompanyDTO> {
        return this.loginCompanyService.execute(companyId, ctx?.user);
    }

    @Get('session')
    async getSession(@Request() req) {
        return { user: req.user, company: req.company };
    }

    /* @UseGuards(ACGuard)
    @UseRoles({
        action: 'read',
        resource: ACLResourcesEnum.ORDER,
        possession: 'any',
    }) */
    @Get('test')
    async testRole(@AuthPermissions() permissions: AppRoles[]) {
        return permissions;
    }
}
