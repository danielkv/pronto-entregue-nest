import { RepositoryBase } from '../../../common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { UserFilterDTO } from '../dtos/user.filter.dto';
import { User } from '../entities/user.entity';
import { RepositoryProviderFactory } from '../../../common/helpers/repository-provider.factory';
import { Address } from 'src/modules/address/entities/address.entity';
import { IUserRepository } from '../interface/user.repository.interface';

@EntityRepository(User)
export class UserRepository extends RepositoryBase<User, UserFilterDTO> implements IUserRepository {
    constructor() {
        super();

        this.setQueryBuilderTableName('user');
    }

    findByEmail(email: string) {
        const query = this.createQueryBuilder(this.tablename);

        query.where('email = :email').setParameters({ email });

        return query.getOne();
    }

    addAddress(userId: User['id'], addressId: Address['id']) {
        const query = this.manager
            .createQueryBuilder()
            .insert()
            .into('user_addresses')
            .values({
                userId,
                addressId,
            });

        return query.execute();
    }

    removeAddress(userId: User['id'], addressId: Address['id']) {
        const query = this.manager
            .createQueryBuilder()
            .delete()
            .from('user_addresses')
            .where('userId = :userId')
            .andWhere('addressId = :addressId')
            .setParameters({
                userId,
                addressId,
            });

        return query.execute();
    }
}

export const UserRepositoryProvider = new RepositoryProviderFactory('IUserRepository', UserRepository).create();
