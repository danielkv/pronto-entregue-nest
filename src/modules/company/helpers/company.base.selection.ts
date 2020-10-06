import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import { Company } from '../entities/company.entity';

@Injectable()
export class CompanyBaseSelection {
    apply(query: SelectQueryBuilder<Company>): SelectQueryBuilder<Company> {
        // join businessHours
        query.leftJoin('company.metas', 'meta', "meta.key = 'businessHours'");

        // query selection
        query.addSelect([
            'COMPANY_IS_OPEN(`meta`.`value`) as isOpen',
            'COMPANY_NEXT_OPEN_DATE(`meta`.`value`, NOW()) as nextOpen',
            'COMPANY_NEXT_CLOSE_DATE(`meta`.`value`) as nextClose',
            'COMPANY_ALLOW_BUY_CLOSED_BY_ID(`company`.`id`) as allowBuyClosed',
        ]);

        // order by (open | allowBuyClosed)
        query.orderBy(
            'isOpen OR (allowBuyClosed IS NOT NULL AND allowBuyClosed <> "false")',
            'DESC',
        );

        // return query
        return query;
    }
}
