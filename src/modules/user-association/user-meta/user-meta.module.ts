import { Module } from '@nestjs/common';
import { UserMetaDTO } from './dtos/user.meta.dto';
import { UserMetaRepositoryProvider } from './repositories/user.meta.reporitory';

@Module({
    imports: [UserMetaDTO],
    providers: [
        // repositories
        UserMetaRepositoryProvider,
    ],
})
export class UserMetaModule {}
