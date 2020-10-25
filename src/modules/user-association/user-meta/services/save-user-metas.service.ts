import { Inject, Injectable } from '@nestjs/common';
import { UserMetaInputDTO } from '../dtos/user.meta.input.dto';
import { UserMeta } from '../entities/user.meta.entity';
import { IUserMetaRepository } from '../interfaces/user-meta.repository.interface';

@Injectable()
export class SaveUserMetasService {
    constructor(@Inject('IUserMetaRepository') private userMetaRepository: IUserMetaRepository) {}

    async execute(userMetas: UserMetaInputDTO[]): Promise<UserMeta[]> {
        const metasToSave = this.userMetaRepository.create(
            userMetas.map(meta => {
                // if is update remove property key (can't update key)
                if (meta.id) delete meta.key;

                return meta;
            }),
        );

        // salve metas
        return this.userMetaRepository.save(metasToSave);
    }
}
