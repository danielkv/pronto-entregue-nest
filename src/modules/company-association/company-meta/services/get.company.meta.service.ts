import { Inject, Injectable } from '@nestjs/common';
import { CompanyMeta } from '../entities/company.meta.entity';
import { ICompanyConfigKeys } from '../dtos/company.config.dto';
import { ICompanyMetaRepository } from '../../company-meta/interfaces/company-meta.repository.interface';

@Injectable()
export class GetCompanyMetaService {
    constructor(
        @Inject('ICompanyMetaRepository') private companyMetaRepository: ICompanyMetaRepository,
    ) {}

    execute(companyId: number[], keys: ICompanyConfigKeys[]): Promise<CompanyMeta[]>;
    execute(companyId: number, keys: ICompanyConfigKeys[]): Promise<CompanyMeta[]>;
    execute(companyId: any, keys: ICompanyConfigKeys[]): Promise<CompanyMeta[]> {
        return this.companyMetaRepository.getMany(companyId, keys);
    }
}
