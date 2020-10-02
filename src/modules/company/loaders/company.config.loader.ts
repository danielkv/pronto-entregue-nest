import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { NestDataLoader } from 'nestjs-dataloader';
import { CompanyMeta } from '../entities/company.meta.entity';
import { GetCompanyMetaService } from '../services/get.company.meta.service';

export interface ICompanyConfigLoader {
    companyId: number;
    keys: string[];
}

@Injectable()
export class CompanyConfigLoader implements NestDataLoader<ICompanyConfigLoader, CompanyMeta[]> {
    constructor(private readonly getCompanyMetaService: GetCompanyMetaService) {}

    generateDataLoader(): DataLoader<ICompanyConfigLoader, CompanyMeta[]> {
        return new DataLoader<ICompanyConfigLoader, CompanyMeta[]>(async keys => {
            const companyIds = keys.map(k => k.companyId);
            const configKeys = keys[0].keys;

            const allMetas = await this.getCompanyMetaService.execute(companyIds, configKeys);

            return keys.map(k_1 => {
                const companyId = k_1.companyId;
                return allMetas.filter(meta => meta.companyId === companyId);
            });
        });
    }
}
