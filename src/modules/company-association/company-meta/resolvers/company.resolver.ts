import { Info, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ConfigTransformHelper } from '../../../common/helpers/config.transform.helper';
import { ExtractFieldsPipe } from '../../../common/pipes/extract-fields.pipe';
import { Company } from '../../company/entities/company.entity';
import { CompanyConfigLoader } from '../loaders/company.config.loader';
import { CompanyConfigDTO } from '../dtos/company.config.dto';

@Resolver(() => Company)
export class CompanyResolver {
    constructor(
        private configTransformHelper: ConfigTransformHelper<CompanyConfigDTO>,
        private companyConfigLoader: CompanyConfigLoader,
    ) {}

    @ResolveField(() => CompanyConfigDTO)
    async config(
        @Parent() company: Company,
        @Info(ExtractFieldsPipe) fields,
    ): Promise<CompanyConfigDTO> {
        const companyId = company.id;

        console.log(companyId);

        // batch load configs
        const configMetas = await this.companyConfigLoader.loader.load({ companyId, keys: fields });

        return this.configTransformHelper.apply(configMetas, CompanyConfigDTO);
    }
}
