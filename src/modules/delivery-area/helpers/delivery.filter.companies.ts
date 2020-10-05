import * as _ from 'lodash';

import { Injectable } from '@nestjs/common';
import { IFilter } from '../../common/interfaces/IFilter';
import { SelectQueryBuilder } from 'typeorm';
import { DeliveryArea } from '../entities/delivery.area.entity';
import { DeliveryAreaFilter } from '../types/delivery.area.filter';

@Injectable()
export class DeliveryAreaFilterCompanies implements IFilter<DeliveryArea, DeliveryAreaFilter> {
    apply(
        query: SelectQueryBuilder<DeliveryArea>,
        filter?: DeliveryAreaFilter,
    ): SelectQueryBuilder<DeliveryArea> {
        if (_.isEmpty(filter) || !filter?.companyId) return query;

        const { companyId } = filter;

        // check companyId type
        const companyIds = !Array.isArray(companyId) ? [companyId] : companyId;

        query.andWhere('companyId IN (:...companyIds)', { companyIds });

        // return query
        return query;
    }
}
