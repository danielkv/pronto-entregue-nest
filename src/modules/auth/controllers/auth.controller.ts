import { Body, Controller, Get, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { Company } from '../../company-association/company/entities/company.entity';
import { AuthContext } from '../decorators/auth-context.decorator';
import { UseRoles } from '../decorators/use-roles.decorator';
import { LoginCompanyDTO } from '../dtos/login-company.dto';
import { ACLResourcesEnum } from '../enums/resources.enum';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { ACGuard } from '../guards/ac.guard';
import { IAuthContext } from '../interfaces/guard-roles.interface';
import { LoginCompanyService } from '../services/login-company.service';
import { LoginUserService } from '../services/login-user.service';
import { JwtCompanyAuthGuard } from '../guards/jwt-company-auth.guard';
import { JwtUserAuthGuard } from '../guards/jwt-user-auth.guard';

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
        @Request() req,
        @Body('companyId', ParseIntPipe) companyId: Company['id'],
    ): Promise<LoginCompanyDTO> {
        return this.loginCompanyService.execute(companyId, req?.user?.userId);
    }

    @Get('session')
    async getSession(@Request() req) {
        return { user: req.user, company: req.company };
    }

    @UseGuards(ACGuard)
    @UseRoles({
        action: 'update',
        resource: ACLResourcesEnum.USER,
    })
    @Get('test')
    async testRole(@AuthContext() scopes: IAuthContext) {
        return scopes;
    }
}
