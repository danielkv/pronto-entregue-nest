import { Injectable } from '@nestjs/common';
import { IFilter } from '../../common/interfaces/IFilter';
import { PickUpAreaFilterDTO } from '../dtos/pickup-area.filter.dto';
import { QueryBuilderBase } from '../../common/repositories/query.builder.base';
import { PickUpArea } from '../entities/pickup-area.entity';

@Injectable()
export class PickUpAreaActiveFilter implements IFilter<PickUpArea, PickUpAreaFilterDTO> {
    apply(
        query: QueryBuilderBase<PickUpArea, PickUpAreaFilterDTO>,
        filter?: PickUpAreaFilterDTO,
    ): QueryBuilderBase<PickUpArea, PickUpAreaFilterDTO> {
        if (filter?.onlyActive === false) return query;

        // apply filter
        query.andWhere('PickUpArea.active');

        // return query
        return query;
    }
}
