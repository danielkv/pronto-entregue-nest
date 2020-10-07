import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFilter } from './dtos/user.filter';
import { UserRepository } from './repositories/user.reporitory';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository]), UserFilter],
})
export class UserModule {}
