import { Inject, Injectable } from '@nestjs/common';
import { CompanyMeta } from '../entities/company.meta.entity';
import { ICompanyConfigKeys } from '../dtos/company.config';
import { ICompanyMetaRepository } from '../interfaces/company-meta.repository.interface';

@Injectable()
export class GetCompanyMetaService {
    constructor(
        @Inject('ICompanyMetaRepository') private companyMetaRepository: ICompanyMetaRepository,
    ) {}

    execute(companyId: number[], keys: ICompanyConfigKeys[]): Promise<CompanyMeta[]>;
    execute(companyId: number, keys: ICompanyConfigKeys[]): Promise<CompanyMeta[]>;
    execute(companyId: any, keys: ICompanyConfigKeys[]): Promise<CompanyMeta[]> {
        const query = this.companyMetaRepository.createQueryBuilder('meta');

        // check companyId type
        const companyIds = !Array.isArray(companyId) ? [companyId] : companyId;

        // add filters
        query.where('meta.companyId IN (:...companyIds)', { companyIds });
        query.andWhere('meta.key IN (:...keys)', { keys });

        // return values
        return query.getMany();
    }
}
