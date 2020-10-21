import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/user-association/user/entities/user.entity';
import { FindUserByEmailService } from 'src/modules/user-association/user/services/find-user-by-email.service';

@Injectable()
export class ValidateUserService {
    constructor(private findUserByEmailService: FindUserByEmailService) {}

    async execute(email: string): Promise<User> {
        const user = await this.findUserByEmailService.execute(email);
        if (user) return user;

        return null;
    }
}
