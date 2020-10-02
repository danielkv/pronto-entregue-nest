import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyMeta } from '../entities/company.meta.entity';

@Injectable()
export class GetCompanyMetaService {
    constructor(
        @InjectRepository(CompanyMeta) private companyMetaRepository: Repository<CompanyMeta>,
    ) {}

    execute(companyId: number[], keys: string[]): Promise<CompanyMeta[]>;
    execute(companyId: number, keys: string[]): Promise<CompanyMeta[]>;
    execute(companyId: any, keys: string[]): Promise<CompanyMeta[]> {
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
