import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { NestEventEmitter } from 'nest-event';
import { IMainEvents } from 'src/main-event-emitter/main-events.interface';
import { PasswordService } from '../../../common/services/password.service';

import { UserInputDTO } from '../dtos/user.input.dto';
import { User } from '../entities/user.entity';
import { ICreateUserInterface } from '../interface/create-user-event.interface';
import { IUserRepository } from '../interface/user.repository.interface';

@Injectable()
export class CreateUserService {
    constructor(
        @Inject('IUserRepository') private userRepository: IUserRepository,
        private passwordService: PasswordService,
        private readonly eventEmitter: NestEventEmitter,
    ) {}

    async execute(user: UserInputDTO): Promise<User> {
        // check if email exists
        const sameEmail = await this.userRepository.findByEmail(user.email);
        if (sameEmail) throw new ConflictException('Já existe um usuário utilizando esse email');

        // hash password
        user.password = await this.passwordService.create(user.password);

        // create user instance
        const userInstace = this.userRepository.create(user);

        // create new user
        // create metas if has metas property
        const newUser = await this.userRepository.save(userInstace);

        // events
        const event: ICreateUserInterface = {
            user: newUser,
        };
        this.eventEmitter.strictEmitter<IMainEvents>().emit('createUser', event);

        return newUser;
    }
}
