import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { CompanyMeta } from '../entities/company.meta.entity';
import { GetCompanyMetaService } from '../services/get.company.meta.service';
import { ICompanyConfigKeys } from '../dtos/company.config';
import { DataLoaderBase } from 'src/modules/common/helpers/data.loader.base';
import { IDataLoaderBase } from 'src/modules/common/helpers/data.loader.interface';

export interface ICompanyConfigLoader {
    companyId: number;
    keys: ICompanyConfigKeys[];
}

@Injectable()
export class CompanyConfigLoader extends DataLoaderBase<ICompanyConfigLoader, CompanyMeta[]>
    implements IDataLoaderBase<ICompanyConfigLoader, CompanyMeta[]> {
    constructor(private readonly getCompanyMetaService: GetCompanyMetaService) {
        super();
    }

    create() {
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
