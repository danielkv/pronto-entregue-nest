import { Module } from '@nestjs/common';
import { UserFilterDTO } from './dtos/user.filter.dto';
import { UserRepositoryProvider } from './repositories/user.reporitory';

import { UserMetaModule } from '../user-meta/user-meta.module';

import { AddressModule } from 'src/modules/address/address.module';

@Module({
    imports: [UserFilterDTO, UserMetaModule, AddressModule],
    providers: [
        // repositories
        UserRepositoryProvider,
    ],
})
export class UserModule {}
