import { Injectable } from '@nestjs/common';
import { IFilter } from '../../../common/interfaces/IFilter';
import { Brackets } from 'typeorm';
import { CompanyFilterDTO } from '../dtos/company.filter.dto';
import * as _ from 'lodash';
import { Company } from '../entities/company.entity';
import { QueryBuilderBase } from '../../../common/repositories/query.builder.base';

@Injectable()
export class CompanyLocationFilter implements IFilter<Company, CompanyFilterDTO> {
    apply(
        query: QueryBuilderBase<Company, CompanyFilterDTO>,
        filter?: CompanyFilterDTO,
    ): QueryBuilderBase<Company, CompanyFilterDTO> {
        if (_.isEmpty(filter) || !filter?.location) return query;

        // checks if tables deliveryArea and viewArea were included
        const sql = query.getSql();
        if (!sql.includes('deliveryArea') || !sql.includes('pickUpArea'))
            throw new Error('Não foi possível encontrar a localização do usuário');

        // apply filter
        query.andWhere(
            new Brackets(qb =>
                qb
                    // filter deliveryAreas
                    .where('deliveryArea.id IS NOT NULL')
                    // OR filter viewAreas
                    .orWhere('pickUpArea.id IS NOT NULL'),
            ),
        );

        // return query
        return query;
    }
}
