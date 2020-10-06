import { Info, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { Loader } from 'nestjs-dataloader';
import { ConfigTransformHelper } from 'src/modules/common/helpers/config.transform.helper';
import { ExtractFieldsPipe } from 'src/modules/common/pipes/extract-fields.pipe';
import { Company } from '../entities/company.entity';
import { CompanyMeta } from '../entities/company.meta.entity';
import { CompanyConfigLoader, ICompanyConfigLoader } from '../loaders/company.config.loader';
import { CompanyConfig } from '../types/company-config';

@Resolver(() => Company)
export class CompanyResolver {
    constructor(private configTransformHelper: ConfigTransformHelper<CompanyConfig>) {}

    @ResolveField(() => CompanyConfig)
    async config(
        @Parent() company: Company,
        @Info(ExtractFieldsPipe) fields,
        @Loader(CompanyConfigLoader.name)
        companyConfigLoader: DataLoader<ICompanyConfigLoader, CompanyMeta[]>,
    ): Promise<CompanyConfig> {
        const companyId = company.id;

        // batch load configs
        const configMetas = await companyConfigLoader.load({ companyId, keys: fields });

        return this.configTransformHelper.apply(configMetas, CompanyConfig);
    }
}
