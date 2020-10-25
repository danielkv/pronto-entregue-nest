import { Injectable, NotFoundException } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { TransactionHelper } from 'src/modules/common/helpers/transactionHelper';
import { PasswordService } from '../../../common/services/password.service';
import { IUserMetaRepository } from '../../user-meta/interfaces/user-meta.repository.interface';
import { UserMetaRepository } from '../../user-meta/repositories/user.meta.reporitory';
import { SaveUserMetasService } from '../../user-meta/services/save-user-metas.service';
import { UserInputDTO } from '../dtos/user.input.dto';

import { User } from '../entities/user.entity';
import { IUserRepository } from '../interface/user.repository.interface';
import { UserRepository } from '../repositories/user.reporitory';

@Injectable()
export class UpdateUserService {
    constructor(
        private passwordService: PasswordService,
        private transactionHelper: TransactionHelper,
        private moduleRef: ModuleRef,
    ) {}

    async execute(userId: User['id'], data: UserInputDTO): Promise<User> {
        return this.transactionHelper.execute<User>(async manager => {
            const transactionUserRepository: IUserRepository = manager.getCustomRepository(UserRepository);

            // metas
            if (data.metas) {
                const metas = data.metas.map(meta => ({ ...meta, userId }));
                delete data.metas;

                // create transaction user meta repository
                const transactionUserMetaRepository: IUserMetaRepository = manager.getCustomRepository(
                    UserMetaRepository,
                );

                // send responsability to service
                const saveUserMetasService = new SaveUserMetasService(transactionUserMetaRepository);
                await saveUserMetasService.execute(metas);
            }

            // check if user exists
            const userInstance = await transactionUserRepository.get(userId);
            if (!userInstance) throw new NotFoundException();

            // hash password
            if (data.password) data.password = await this.passwordService.create(data.password);

            // merge old data with new data
            const mergedInstance = transactionUserRepository.merge(userInstance, data);

            // update in db
            const updated = await transactionUserRepository.save(mergedInstance);

            // return value
            return updated;
        });
    }
}
