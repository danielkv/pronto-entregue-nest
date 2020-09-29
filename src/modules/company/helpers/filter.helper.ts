import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import { Company } from '../entities/company.entity';

@Injectable()
export class FilterHelper {
    apply(query: SelectQueryBuilder<Company>, filter?: any): SelectQueryBuilder<Company> {
        if (!filter) return query;

        if (filter?.search) {
        }

        return query;
    }

    applySearch(query: SelectQueryBuilder<Company>, search: string): SelectQueryBuilder<Company> {
        return query
            .where('company.name LIKE :search', {
                search: `%${search}%`,
            })
            .orWhere('company.displayName LIKE :search', {
                search: `%${search}%`,
            });
    }
}
