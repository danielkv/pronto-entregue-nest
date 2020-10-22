import { Module } from '@nestjs/common';
import { UserMetaDTO } from './dtos/user.meta.dto';
import { UserMetaInputDTO } from './dtos/user.meta.input.dto';
import { UserMetaRepositoryProvider } from './repositories/user.meta.reporitory';
import { CreateUserMetaService } from './services/create-user-meta.service';

@Module({
    imports: [UserMetaDTO, UserMetaInputDTO],
    providers: [
        // services
        CreateUserMetaService,

        // repositories
        UserMetaRepositoryProvider,
    ],
    exports: [CreateUserMetaService],
})
export class UserMetaModule {}
