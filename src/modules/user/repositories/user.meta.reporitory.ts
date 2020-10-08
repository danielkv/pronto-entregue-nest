import { FactoryProvider } from '@nestjs/common';
import { RepositoryBase } from 'src/modules/common/repositories/repository.base';
import { Connection, EntityRepository } from 'typeorm';
import { UserMeta } from '../entities/user.meta.entity';

@EntityRepository(UserMeta)
export class UserMetaRepository extends RepositoryBase<UserMeta> {}

export const ProductRepositoryProvider: FactoryProvider<UserMetaRepository> = {
    provide: 'IProductRepository',
    useFactory: (connection: Connection) => connection.getCustomRepository(UserMetaRepository),
    inject: [Connection],
};
