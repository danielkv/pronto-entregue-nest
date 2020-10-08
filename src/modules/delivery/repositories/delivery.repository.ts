import { RepositoryBase } from '../../common/repositories/repository.base';
import { Connection, EntityRepository } from 'typeorm';
import { DeliveryFilterDTO } from '../dtos/delivery.filter.dto';
import { Delivery } from '../entities/delivery.entity';
import { IDeliveryRepository } from '../interfaces/delivery.repository.interface';
import { DeliverySearchFilter } from '../filters/delivery.search.filter';
import { FactoryProvider } from '@nestjs/common';

@EntityRepository(Delivery)
export class DeliveryRepository extends RepositoryBase<Delivery, DeliveryFilterDTO>
    implements IDeliveryRepository {
    constructor() {
        super();

        this.setFilters([new DeliverySearchFilter()]);
    }
}

export const DeliveryRepositoryProvider: FactoryProvider<DeliveryRepository> = {
    provide: 'IDeliveryRepository',
    useFactory: (connection: Connection) => connection.getCustomRepository(DeliveryRepository),
    inject: [Connection],
};
