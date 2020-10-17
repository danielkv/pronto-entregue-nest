import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { configService } from 'src/config/config.service';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './strategies/local-strategy';
import { LoginUserService } from './services/login-user.service';
import { ValidateUserService } from './services/validate-user.service';
import { AuthController } from './controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt-strategy';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: configService.getValue('ACCESS_TOKEN_SECRET'),
            signOptions: { expiresIn: '60s' },
        }),
    ],
    providers: [ValidateUserService, LoginUserService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
