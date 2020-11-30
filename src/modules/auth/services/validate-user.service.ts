import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/user-association/user/entities/user.entity';

@Injectable()
export class ValidateUserService {
    /* constructor(private findUserByEmailService: FindUserByEmailService) {}

    async execute(email: string): Promise<User> {
        const user = await this.findUserByEmailService.execute(email);
        if (user) return user;

        return null;
    } */
}
