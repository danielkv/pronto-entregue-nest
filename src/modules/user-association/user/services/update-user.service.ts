import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionHelper } from 'src/modules/common/helpers/transactionHelper';
import { PasswordService } from '../../../common/services/password.service';
import { UserInputDTO } from '../dtos/user.input.dto';

import { User } from '../entities/user.entity';
import { IUserRepository } from '../interface/user.repository.interface';
import { UserRepository } from '../repositories/user.reporitory';

@Injectable()
export class UpdateUserService {
    constructor(private passwordService: PasswordService, private transactionHelper: TransactionHelper) {}

    async execute(userId: User['id'], data: UserInputDTO): Promise<User> {
        return this.transactionHelper.execute<User>(async manager => {
            const transactionUserRepository: IUserRepository = manager.getCustomRepository(UserRepository);

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
