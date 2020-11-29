import { RepositoryBase } from '../../../common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Address } from 'src/modules/address/entities/address.entity';

@EntityRepository(User)
export class UserRepository extends RepositoryBase<User> {
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
