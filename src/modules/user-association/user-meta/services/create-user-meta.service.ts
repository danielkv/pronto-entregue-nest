import { Inject, Injectable } from '@nestjs/common';
import { UserMetaInputDTO } from '../dtos/user.meta.input.dto';
import { UserMeta } from '../entities/user.meta.entity';
import { IUserMetaRepository } from '../interfaces/user-meta.repository.interface';

@Injectable()
export class CreateUserMetaService {
    constructor(@Inject('IUserMetaRepository') private userMetaRepository: IUserMetaRepository) {}

    execute(userMeta: UserMetaInputDTO): Promise<UserMeta> {
        // create new userMeta
        return this.userMetaRepository.createNew(userMeta);
    }
}
