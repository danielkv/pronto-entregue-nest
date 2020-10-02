import { Args, ID, Info, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Company } from '../entities/company.entity';
import { GetCompanyConfigService } from '../services/get-company-config.service';
import { CompanyConfig } from '../types/company-config';

@Resolver(() => Company)
export class CompanyResolver {
    constructor(private getCompanyConfigService: GetCompanyConfigService) {}

    @ResolveField(() => CompanyConfig)
    config(@Parent() company: Company, @Info() info) {
        const companyId = company.id;

        // map keys
        const keys = info.fieldNodes[0].selectionSet.selections.map(f => f.name.value);

        // return config
        return this.getCompanyConfigService.execute(companyId, keys);
    }
}
