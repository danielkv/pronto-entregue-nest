import { RepositoryBase } from '../../common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { DeliveryArea } from '../entities/delivery.area.entity';
import { DeliveryAreaFilter } from '../dtos/delivery.area.filter';
import { DeliveryAreaLocationFilter } from '../filters/delivery.area.location.filter';
import { DeliveryAreaCompaniesFilter } from '../filters/delivery.area.companies.filter';
import { DeliveryAreaActiveFilter } from '../filters/delivery.area.active.filter';

@EntityRepository(DeliveryArea)
export class DeliveryAreaRepository extends RepositoryBase<DeliveryArea, DeliveryAreaFilter> {
    constructor() {
        super();

        this.setFilters([
            new DeliveryAreaLocationFilter(),
            new DeliveryAreaCompaniesFilter(),
            new DeliveryAreaActiveFilter(),
        ]);
    }
}
