import { Module } from '@nestjs/common';
import { UserMetaDTO } from './dtos/user.meta.dto';
import { UserMetaInputDTO } from './dtos/user.meta.input.dto';
import { UserMetaRepositoryProvider } from './repositories/user.meta.reporitory';
import { CreateManyUserMetaService } from './services/create-many-user-meta.service';
import { CreateUserMetaService } from './services/create-user-meta.service';

@Module({
    imports: [UserMetaDTO, UserMetaInputDTO],
    providers: [
        // services
        CreateManyUserMetaService,
        CreateUserMetaService,

        // repositories
        UserMetaRepositoryProvider,
    ],
    exports: [CreateManyUserMetaService, CreateUserMetaService],
})
export class UserMetaModule {}
