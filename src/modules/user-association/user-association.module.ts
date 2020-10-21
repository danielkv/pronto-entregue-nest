import { Module } from '@nestjs/common';
import { UserMetaModule } from './user-meta/user-meta.module';

@Module({
  imports: [UserMetaModule]
})
export class UserAssociationModule {}
