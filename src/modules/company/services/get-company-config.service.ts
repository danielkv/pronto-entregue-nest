import { Injectable } from '@nestjs/common';
import { ConfigTransformHelper } from '../../common/helpers/config.transform.helper';
import { CompanyConfig, ICompanyConfigKeys } from '../dtos/company.config';
import { GetCompanyMetaService } from './get.company.meta.service';

@Injectable()
export class GetCompanyConfigService {
    constructor(
        private getCompanyMetaService: GetCompanyMetaService,
        private configTransformHelper: ConfigTransformHelper<CompanyConfig>,
    ) {}

    async execute(companyId: number[], keys: ICompanyConfigKeys[]): Promise<CompanyConfig>;
    async execute(companyId: number, keys: ICompanyConfigKeys[]): Promise<CompanyConfig>;
    async execute(companyId: any, keys: ICompanyConfigKeys[]): Promise<CompanyConfig> {
        // check companyId type
        const companyIds = !Array.isArray(companyId) ? [companyId] : companyId;

        // load metas
        const metas = await this.getCompanyMetaService.execute(companyIds, keys);

        // transform configs
        const configs = this.configTransformHelper.apply(metas, CompanyConfig);

        return configs;
    }
}
