import { RepositoryBase } from '../../common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { DeliveryFilterDTO } from '../dtos/delivery.filter.dto';
import { Delivery } from '../entities/delivery.entity';
import { IDeliveryRepository } from '../interfaces/delivery.repository.interface';
import { RepositoryProviderFactory } from '../../common/helpers/repository-provider.factory';
import { User } from 'src/modules/user-association/user/entities/user.entity';
import { DeliveryStatusEnum } from '../enums/delivery.status.enum';

@EntityRepository(Delivery)
export class DeliveryRepository extends RepositoryBase<Delivery, DeliveryFilterDTO> implements IDeliveryRepository {
    constructor() {
        super();

        this.setQueryBuilderTableName('delivery');
    }

    setDeliveryMan(deliveryId: Delivery['id'], userId: User['id']): Promise<any> {
        const query = this.createQueryBuilder(this.tablename);

        query
            .update()
            .set({ deliveryManId: userId })
            .whereInIds(deliveryId);

        return query.execute();
    }

    changeStatus(deliveryId: Delivery['id'], newStatus: DeliveryStatusEnum): Promise<any> {
        const query = this.createQueryBuilder(this.tablename);

        query
            .update()
            .set({ status: newStatus })
            .whereInIds(deliveryId);

        return query.execute();
    }
}

export const DeliveryRepositoryProvider = new RepositoryProviderFactory(
    'IDeliveryRepository',
    DeliveryRepository,
).create();
