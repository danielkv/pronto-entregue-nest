import {
    DeepPartial,
    InjectQueryService,
    QueryService,
    RelationQueryService,
    UpdateOneOptions,
} from '@nestjs-query/core';
import { User } from '../entities/user.entity';
import { Address } from 'src/modules/address/entities/address.entity';
import { UserInputDTO } from '../dtos/user-create.dto';
import { ForbiddenException } from '@nestjs/common';
import { PasswordService } from 'src/modules/common/services/password.service';
import { NestEventEmitter } from 'nest-event';
import { IMainEvents } from 'src/main-event-emitter/main-events.interface';
import { ICreateUserEvent } from '../interface/create-user-event.interface';
import { IUpdateUserEvent } from '../interface/update-user-event.interface';

export class UserService extends RelationQueryService<User, DeepPartial<UserInputDTO>, DeepPartial<UserInputDTO>> {
    constructor(
        @InjectQueryService(User) queryService: QueryService<User>,
        @InjectQueryService(Address) addressQueryService: QueryService<Address>,
        private passwordService: PasswordService,
        private eventEmitter: NestEventEmitter,
    ) {
        // provide the original query service so all relations defined in the ORM work
        super(queryService, {
            // specify the virtual relations
            completedSubTasks: {
                // provide the service that will be used to query the relation
                service: addressQueryService,
                // the query method accepts a todoItem that can be used to filter the relations
                query(user) {
                    // filter for all relations that belong to the todoItem and are completed
                    return { filter: { user: { eq: user.id } } };
                },
            },
        });
    }

    async createOne(user: DeepPartial<UserInputDTO>): Promise<User> {
        // test duplicated email
        const duplicatedUserEmail = await this.query({ filter: { email: { eq: user.email } } });
        if (duplicatedUserEmail.length) throw new ForbiddenException('Esse email já existe');

        // generate new hashed password
        const newPassword = await this.passwordService.create(user.password);

        // create user
        const createdUser = await super.createOne({ ...user, password: newPassword });

        // events
        const event: ICreateUserEvent = {
            user: createdUser,
        };
        this.eventEmitter.strictEmitter<IMainEvents>().emit('createUser', event);

        return createdUser;
    }

    async updateOne(
        id: string | number,
        user: DeepPartial<UserInputDTO>,
        opts?: UpdateOneOptions<User>,
    ): Promise<User> {
        // test duplicated email
        const duplicatedUserEmail = await this.query({
            filter: { email: { eq: user.email }, id: { neq: Number(id) } },
        });
        if (duplicatedUserEmail.length) throw new ForbiddenException('Esse email já existe');

        // generate new hashed password
        if (user.password) {
            const newPassword = await this.passwordService.create(user.password);
            user.password = newPassword;
        }

        // create user
        const updatedUser = await super.updateOne(id, user, opts);

        // events
        const event: IUpdateUserEvent = {
            user: updatedUser,
        };
        this.eventEmitter.strictEmitter<IMainEvents>().emit('updateUser', event);

        return updatedUser;
    }
}
