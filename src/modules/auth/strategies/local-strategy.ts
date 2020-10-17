import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ValidateUserService } from '../services/validate-user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private validateUserService: ValidateUserService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
    }

    async validate(email: string, password: string): Promise<any> {
        console.log('asd');
        const user = await this.validateUserService.execute(email);

        if (!user /* && user.password === password */) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
