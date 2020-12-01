import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ValidateUserService } from '../services/validate-user.service';
import { User } from 'src/modules/user-association/user/entities/user.entity';
import { PasswordService } from 'src/modules/common/services/password.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private validateUserService: ValidateUserService, private passwordService: PasswordService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
    }

    async validate(email: string, password: string): Promise<User> {
        const user = await this.validateUserService.execute(email);

        if (!user || !(await this.passwordService.compare(password, user.password)))
            throw new UnauthorizedException('Email ou senha incorreta');

        return user;
    }
}
