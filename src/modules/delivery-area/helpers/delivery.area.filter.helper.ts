import { Injectable } from '@nestjs/common';
import { FilterHelper } from 'src/modules/common/helpers/filter.helper';
import { IFilterHelper } from 'src/modules/common/interfaces/IFilterHelper';
import { DeliveryArea } from '../entities/delivery.area.entity';
import { DeliveryAreaFilter } from '../types/delivery.area.filter';
import { DeliveryAreaCompaniesFilter } from '../filters/delivery.area.companies.filter';
import { DeliveryAreaLocationFilter } from '../filters/delivery.area.location.filter';
import { DeliveryAreaActiveFilter } from '../filters/delivery.area.active.filter';

@Injectable()
export class DeliveryAreaFilterHelper extends FilterHelper<DeliveryArea, DeliveryAreaFilter>
    implements IFilterHelper<DeliveryArea, DeliveryAreaFilter> {
    constructor(
        private locationFilter: DeliveryAreaLocationFilter,
        private companyFilter: DeliveryAreaCompaniesFilter,
        private activeFilter: DeliveryAreaActiveFilter,
    ) {
        super();
    }

    apply(query, filter) {
        this.applyFilters(query, filter, [
            this.companyFilter,
            this.locationFilter,
            this.activeFilter,
        ]);
    }
}
