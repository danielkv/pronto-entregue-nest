import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { configService } from 'src/config/config.service';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './strategies/local-strategy';
import { LoginUserService } from './services/login-user.service';
import { ValidateUserService } from './services/validate-user.service';
import { AuthController } from './controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt-user-strategy';
import { JwtCompanyStrategy } from './strategies/jwt-company-strategy';
import { CompanyUserModule } from '../company-association/company-user/company-user.module';
import { LoginCompanyDTO } from './dtos/login-company.dto';
import { LoginUserDTO } from './dtos/login-user.dto';
import { LoginCompanyService } from './services/login-company.service';
import { AccessControlProvider } from './acl/acRoles';
import { ExtractAclScopesHelper } from './helpers/extract-permissions-scopes.helper';
import { AcCheckService } from './services/validate-roles.service';

@Global()
@Module({
    imports: [
        LoginCompanyDTO,
        LoginUserDTO,

        UserModule,
        CompanyUserModule,
        PassportModule,
        JwtModule.register({
            secret: configService.getValue('ACCESS_TOKEN_SECRET'),
            signOptions: { expiresIn: '60s' },
        }),
    ],
    providers: [
        // services
        ValidateUserService,
        LoginUserService,
        LoginCompanyService,
        AcCheckService,

        // strategies
        LocalStrategy,
        JwtStrategy,
        JwtCompanyStrategy,

        ExtractAclScopesHelper,
        AccessControlProvider,
    ],
    exports: [AccessControlProvider, ExtractAclScopesHelper, AcCheckService],
    controllers: [AuthController],
})
export class AuthModule {}
