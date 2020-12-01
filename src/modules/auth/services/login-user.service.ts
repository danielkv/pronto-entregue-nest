import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/user-association/user/entities/user.entity';
import { AppRoles } from '../enums/app-roles.enum';
import { LoginUserDTO } from '../dtos/login-user.dto';
import { AuthenticatedUser } from '../interfaces/authenticated-user.interface';

@Injectable()
export class LoginUserService {
    constructor(private jwtService: JwtService) {}

    execute(user: User): LoginUserDTO {
        const permissions = user.isMaster ? [AppRoles.MASTER] : [AppRoles.CUSTOMER];

        const payload: AuthenticatedUser = { userId: user.id, email: user.email, permissions: permissions };

        const userAccessToken = this.jwtService.sign(payload);

        return { userAccessToken };
    }
}
