import { Injectable } from '@nestjs/common';
import { ConfigTransformHelper } from '../../common/helpers/config.transform.helper';
import { CompanyConfigDTO, ICompanyConfigKeys } from '../dtos/company.config.dto';
import { GetCompanyMetaService } from './get.company.meta.service';

@Injectable()
export class GetCompanyConfigService {
    constructor(
        private getCompanyMetaService: GetCompanyMetaService,
        private configTransformHelper: ConfigTransformHelper<CompanyConfigDTO>,
    ) {}

    async execute(companyId: number[], keys: ICompanyConfigKeys[]): Promise<CompanyConfigDTO>;
    async execute(companyId: number, keys: ICompanyConfigKeys[]): Promise<CompanyConfigDTO>;
    async execute(companyId: any, keys: ICompanyConfigKeys[]): Promise<CompanyConfigDTO> {
        // check companyId type
        const companyIds = !Array.isArray(companyId) ? [companyId] : companyId;

        // load metas
        const metas = await this.getCompanyMetaService.execute(companyIds, keys);

        // transform configs
        const configs = this.configTransformHelper.apply(metas, CompanyConfigDTO);

        return configs;
    }
}
