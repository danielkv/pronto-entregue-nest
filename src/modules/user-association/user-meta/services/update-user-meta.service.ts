import { Inject, Injectable } from '@nestjs/common';
import { UserMetaInputDTO } from '../dtos/user.meta.input.dto';
import { UserMeta } from '../entities/user.meta.entity';
import { IUserMetaRepository } from '../interfaces/user-meta.repository.interface';

@Injectable()
export class UpdateUserMetasService {
    constructor(@Inject('IUserMetaRepository') private userMetaRepository: IUserMetaRepository) {}

    async execute(userMetaId: UserMeta['id'], userMeta: UserMetaInputDTO): Promise<UserMeta> {
        // check if meta exists
        const oldUserMeta = await this.userMetaRepository.get(userMetaId);
        if (!oldUserMeta) throw new Error('Meta não existe');

        // merge new data
        const mergedData = this.userMetaRepository.merge(oldUserMeta, userMeta);

        // update meta
        await this.userMetaRepository.update(userMetaId, userMeta);

        return mergedData;
    }
}
