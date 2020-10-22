import { Module } from '@nestjs/common';
import { UserMetasLoader } from '../user/loaders/user-metas.loader';
import { UserMetaDTO } from './dtos/user.meta.dto';
import { UserMetaInputDTO } from './dtos/user.meta.input.dto';
import { UserMetaUserFilter } from './filters/user-meta-user.filter';
import { UserMetaRepositoryProvider } from './repositories/user.meta.reporitory';
import { CreateUserMetaService } from './services/create-user-meta.service';
import { ListUserMetasService } from './services/list-user-metas.service';

@Module({
    imports: [UserMetaDTO, UserMetaInputDTO],
    providers: [
        // services
        CreateUserMetaService,
        ListUserMetasService,

        // loaders
        UserMetasLoader,

        // filters
        UserMetaUserFilter,

        // repositories
        UserMetaRepositoryProvider,
    ],
    exports: [UserMetasLoader],
})
export class UserMetaModule {}
