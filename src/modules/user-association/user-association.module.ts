import { Module } from '@nestjs/common';
import { UserMetaModule } from './user-meta/user-meta.module';
import { User } from './user/entities/user.entity';

@Module({
    imports: [UserMetaModule, User],
})
export class UserAssociationModule {}
