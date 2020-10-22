import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { PasswordService } from '../../../common/services/password.service';

import { UserInputDTO } from '../dtos/user.input.dto';
import { User } from '../entities/user.entity';
import { IUserRepository } from '../interface/user.repository.interface';

@Injectable()
export class CreateUserService {
    constructor(
        @Inject('IUserRepository') private userRepository: IUserRepository,
        private passwordService: PasswordService,
    ) {}

    async execute(user: UserInputDTO): Promise<User> {
        // check if email exists
        const sameEmail = await this.userRepository.findByEmail(user.email);
        if (sameEmail) throw new ConflictException('Já existe um usuário utilizando esse email');

        // hash password
        user.password = await this.passwordService.create(user.password);

        // create new user
        // create metas if has metas property
        const newUser = await this.userRepository.createNew(user);

        return newUser;
    }
}
