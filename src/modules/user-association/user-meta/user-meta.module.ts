import { Module } from '@nestjs/common';
import { UserMetaDTO } from './dtos/user.meta.dto';
import { UserMetaInputDTO } from './dtos/user.meta.input.dto';
import { UserMetaKeyFilter } from './filters/user-meta-key.filter';
import { UserMetaUserFilter } from './filters/user-meta-user.filter';
import { UserMetaRepositoryProvider } from './repositories/user.meta.reporitory';
import { CreateUserMetaService } from './services/create-user-meta.service';
import { GetUserMetaService } from './services/get-user-meta.service';
import { ListUserMetasService } from './services/list-user-metas.service';
import { SaveUserMetasService } from './services/save-user-metas.service';

@Module({
    imports: [UserMetaDTO, UserMetaInputDTO],
    providers: [
        // services
        CreateUserMetaService,
        ListUserMetasService,
        GetUserMetaService,
        SaveUserMetasService,

        // filters
        UserMetaUserFilter,
        UserMetaKeyFilter,

        // repositories
        UserMetaRepositoryProvider,
    ],
    exports: [ListUserMetasService],
})
export class UserMetaModule {}
