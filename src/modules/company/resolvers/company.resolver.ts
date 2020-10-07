import { Info, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ConfigTransformHelper } from 'src/modules/common/helpers/config.transform.helper';
import { ExtractFieldsPipe } from 'src/modules/common/pipes/extract-fields.pipe';
import { Company } from '../entities/company.entity';
import { CompanyConfigLoader } from '../loaders/company.config.loader';
import { CompanyConfig } from '../dtos/company.config';

@Resolver(() => Company)
export class CompanyResolver {
    constructor(
        private configTransformHelper: ConfigTransformHelper<CompanyConfig>,
        private companyConfigLoader: CompanyConfigLoader,
    ) {}

    @ResolveField(() => CompanyConfig)
    async config(
        @Parent() company: Company,
        @Info(ExtractFieldsPipe) fields,
    ): Promise<CompanyConfig> {
        const companyId = company.id;

        // batch load configs
        const configMetas = await this.companyConfigLoader.loader.load({ companyId, keys: fields });

        return this.configTransformHelper.apply(configMetas, CompanyConfig);
    }
}
