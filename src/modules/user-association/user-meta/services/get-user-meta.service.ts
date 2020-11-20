import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../user/entities/user.entity';
import { UserMeta } from '../entities/user.meta.entity';
import { IUserMetaRepository } from '../interfaces/user-meta.repository.interface';

@Injectable()
export class GetUserMetaService {
    constructor(@Inject('IUserMetaRepository') private userMetaRepository: IUserMetaRepository) {}

    execute(userId: User['id'], key: UserMeta['key']): Promise<UserMeta> {
        return this.userMetaRepository.getByUserId(userId, key);
    }
}
