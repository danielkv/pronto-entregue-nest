import { Info, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { Loader } from 'nestjs-dataloader';
import { ConfigTransformHelper } from 'src/modules/common/helpers/config.transform.helper';
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
        @Info() info,
        @Loader(CompanyConfigLoader.name)
        companyConfigLoader: DataLoader<ICompanyConfigLoader, CompanyMeta[]>,
    ): Promise<CompanyConfig> {
        const companyId = company.id;

        // map keys
        const keys = info.fieldNodes[0].selectionSet.selections.map(f => f.name.value);

        // batch load configs
        const configMetas = await companyConfigLoader.load({ companyId, keys });

        return this.configTransformHelper.apply(configMetas, CompanyConfig);
    }
}
