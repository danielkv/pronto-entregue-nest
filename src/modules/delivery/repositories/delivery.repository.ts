import { RepositoryBase } from '../../common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { DeliveryFilterDTO } from '../dtos/delivery.filter.dto';
import { Delivery } from '../entities/delivery.entity';
import { IDeliveryRepository } from '../interfaces/delivery.repository.interface';
import { RepositoryProviderFactory } from '../../common/helpers/repository-provider.factory';

@EntityRepository(Delivery)
export class DeliveryRepository extends RepositoryBase<Delivery, DeliveryFilterDTO> implements IDeliveryRepository {
    constructor() {
        super();

        this.setQueryBuilderTableName('delivery');
    }
}

export const DeliveryRepositoryProvider = new RepositoryProviderFactory(
    'IDeliveryRepository',
    DeliveryRepository,
).create();
