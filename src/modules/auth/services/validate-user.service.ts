import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/user-association/user/entities/user.entity';

@Injectable()
export class ValidateUserService {
    constructor(@InjectQueryService(User) private companyUserService: QueryService<User>) {}

    async execute(email: string): Promise<User> {
        const user = await this.companyUserService.query({ filter: { email: { eq: email }, active: { is: true } } });
        if (user.length === 1) return user[0];

        return null;
    }
}
