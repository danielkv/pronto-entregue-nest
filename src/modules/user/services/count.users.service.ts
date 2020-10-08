import { Inject, Injectable } from '@nestjs/common';
import { UserFilterDTO } from '../dtos/user.filter.dto';
import { IUserRepository } from '../interface/user.repository.interface';

@Injectable()
export class CountUsersService {
    constructor(@Inject('IUserRepository') private userRepository: IUserRepository) {}

    execute(filter: UserFilterDTO): Promise<number> {
        return this.userRepository.getCount(filter);
    }
}
