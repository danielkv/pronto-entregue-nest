import { Injectable } from '@nestjs/common';
import { IFilter } from '../../common/interfaces/IFilter';
import { DeliveryArea } from '../entities/delivery.area.entity';
import { DeliveryAreaFilter } from '../dtos/delivery.area.filter';
import { QueryBuilderBase } from 'src/modules/common/repositories/query.builder.base';

@Injectable()
export class DeliveryAreaCompaniesFilter implements IFilter<DeliveryArea, DeliveryAreaFilter> {
    apply(
        query: QueryBuilderBase<DeliveryArea, DeliveryAreaFilter>,
        filter?: DeliveryAreaFilter,
    ): QueryBuilderBase<DeliveryArea, DeliveryAreaFilter> {
        if (!filter?.companyId) return query;

        const { companyId } = filter;

        // check companyId type
        const companyIds = !Array.isArray(companyId) ? [companyId] : companyId;

        query.andWhere('companyId IN (:...companyIds)', { companyIds });

        // return query
        return query;
    }
}
