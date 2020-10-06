import { Injectable } from '@nestjs/common';
import { IFilter } from '../../common/interfaces/IFilter';
import { Brackets, SelectQueryBuilder } from 'typeorm';
import { CompanyFilter } from '../types/company.filter';
import * as _ from 'lodash';
import { Company } from '../entities/company.entity';

@Injectable()
export class CompanyLocationFilter implements IFilter<Company, CompanyFilter> {
    apply(query: SelectQueryBuilder<Company>, filter?: CompanyFilter): SelectQueryBuilder<Company> {
        if (_.isEmpty(filter) || !filter?.location) return query;

        // checks if tables deliveryArea and viewArea were included
        const sql = query.getSql();
        if (!sql.includes('deliveryArea') || !sql.includes('deliveryArea'))
            throw new Error('Não foi possível encontrar a localização do usuário');

        // apply filter
        query.andWhere(
            new Brackets(qb =>
                qb
                    // filter deliveryAreas
                    .where('deliveryArea.id IS NOT NULL')
                    // OR filter viewAreas
                    .orWhere('viewArea.id IS NOT NULL'),
            ),
        );

        // return query
        return query;
    }
}
