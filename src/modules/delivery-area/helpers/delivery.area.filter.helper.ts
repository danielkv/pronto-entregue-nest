import { Injectable } from '@nestjs/common';
import { FilterHelper } from 'src/modules/common/helpers/filter.helper';
import { IFilterHelper } from 'src/modules/common/interfaces/IFilterHelper';
import { DeliveryArea } from '../entities/delivery.area.entity';
import { DeliveryAreaFilter } from '../types/delivery.area.filter';
import { DeliveryAreaFilterCompanies } from './delivery.filter.companies';
import { DeliveryAreaFilterLocation } from './delivery.filter.location';

@Injectable()
export class DeliveryAreaFilterHelper extends FilterHelper<DeliveryArea, DeliveryAreaFilter>
    implements IFilterHelper<DeliveryArea, DeliveryAreaFilter> {
    constructor(
        private filterLocation: DeliveryAreaFilterLocation,
        private filterCompany: DeliveryAreaFilterCompanies,
    ) {
        super();
    }

    apply(query, filter) {
        this.applyFilters(query, filter, [this.filterCompany, this.filterLocation]);
    }
}
