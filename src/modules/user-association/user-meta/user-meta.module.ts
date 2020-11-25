import { Module } from '@nestjs/common';
import { UserMetaDTO } from './dtos/user.meta.dto';
import { UserMetaInputDTO } from './dtos/user.meta.input.dto';

import { UserMetaRepositoryProvider } from './repositories/user.meta.reporitory';

@Module({
    imports: [UserMetaDTO, UserMetaInputDTO],
    providers: [
        // repositories
        UserMetaRepositoryProvider,
    ],
})
export class UserMetaModule {}
