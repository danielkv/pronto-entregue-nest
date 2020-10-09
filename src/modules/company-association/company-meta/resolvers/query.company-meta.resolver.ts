import { Args, ID, Info, Query, Resolver } from '@nestjs/graphql';
import { ExtractFieldsPipe } from 'src/modules/common/pipes/extract-fields.pipe';
import { CompanyConfigDTO, ICompanyConfigKeys } from '../dtos/company.config.dto';
import { GetCompanyConfigService } from '../services/get-company-config.service';

@Resolver()
export class QueryCompanyMetaResolver {
    constructor(private getCompanyConfigService: GetCompanyConfigService) {}

    @Query(() => CompanyConfigDTO)
    companyConfig(
        @Args('companyId', { type: () => ID }) companyId: number,
        @Info(ExtractFieldsPipe) keys: ICompanyConfigKeys[],
    ) {
        // return config
        return this.getCompanyConfigService.execute(companyId, keys);
    }
}
