import { Injectable } from '@nestjs/common';
import { IFilter } from '../../common/interfaces/IFilter';
import { DeliveryArea } from '../entities/delivery.area.entity';
import { DeliveryAreaFilterDTO } from '../dtos/delivery.area.filter.dto';
import { QueryBuilderBase } from '../../common/repositories/query.builder.base';

@Injectable()
export class DeliveryAreaCompaniesFilter implements IFilter<DeliveryArea, DeliveryAreaFilterDTO> {
    apply(
        query: QueryBuilderBase<DeliveryArea, DeliveryAreaFilterDTO>,
        filter?: DeliveryAreaFilterDTO,
    ): QueryBuilderBase<DeliveryArea, DeliveryAreaFilterDTO> {
        if (!filter?.companyId) return query;

        const { companyId } = filter;

        // check companyId type
        const companyIds = !Array.isArray(companyId) ? [companyId] : companyId;

        query.andWhere('deliveryArea.companyId IN (:...companyIds)', { companyIds });

        // return query
        return query;
    }
}
