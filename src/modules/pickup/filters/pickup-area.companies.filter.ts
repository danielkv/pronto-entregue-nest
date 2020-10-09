import { Injectable } from '@nestjs/common';
import { IFilter } from '../../common/interfaces/IFilter';
import { PickUpAreaFilterDTO } from '../dtos/pickup-area.filter.dto';
import { QueryBuilderBase } from '../../common/repositories/query.builder.base';
import { PickUpArea } from '../entities/pickup-area.entity';

@Injectable()
export class PickUpAreaCompaniesFilter implements IFilter<PickUpArea, PickUpAreaFilterDTO> {
    apply(
        query: QueryBuilderBase<PickUpArea, PickUpAreaFilterDTO>,
        filter?: PickUpAreaFilterDTO,
    ): QueryBuilderBase<PickUpArea, PickUpAreaFilterDTO> {
        if (!filter?.companyId) return query;

        const { companyId } = filter;

        // check companyId type
        const companyIds = !Array.isArray(companyId) ? [companyId] : companyId;

        query.andWhere('PickUpArea.companyId IN (:...companyIds)', { companyIds });

        // return query
        return query;
    }
}
