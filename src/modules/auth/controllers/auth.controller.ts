import { Controller, Get, Headers, Post, Request, UseGuards } from '@nestjs/common';
import { Company } from '../../company-association/company/entities/company.entity';
import { LoginCompanyDTO } from '../dtos/login-company.dto';
import { JwtCompanyAuthGuard } from '../guards/jwt--company-auth.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { LoginCompanyService } from '../services/login-company.service';
import { LoginUserService } from '../services/login-user.service';

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
    async selectCompany(@Request() req, @Headers('company_id') companyId: Company['id']): Promise<LoginCompanyDTO> {
        console.log(req.user);
        return this.loginCompanyService.execute(companyId, req?.user?.userId);
    }

    @UseGuards(JwtAuthGuard, JwtCompanyAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        return req.user;
    }
}
