import { RepositoryBase } from '../../common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { DeliveryFilterDTO } from '../dtos/delivery.filter.dto';
import { Delivery } from '../entities/delivery.entity';
import { IDeliveryRepository } from '../interfaces/delivery.repository.interface';
import { DeliverySearchFilter } from '../filters/delivery.search.filter';

@EntityRepository(Delivery)
export class DeliveryRepository extends RepositoryBase<Delivery, DeliveryFilterDTO>
    implements IDeliveryRepository {
    constructor() {
        super();

        this.setFilters([new DeliverySearchFilter()]);
    }
}
