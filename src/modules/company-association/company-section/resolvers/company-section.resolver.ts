import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Company } from '../../company/entities/company.entity';
import { CompanySection } from '../entities/company.type.entity';
import { CompanySectionLoader } from '../loaders/company-section.loader';

@Resolver(() => Company)
export class CompanySectionResolver {
    constructor(private companySectionLoader: CompanySectionLoader) {}

    @ResolveField(() => [CompanySection])
    sections(@Parent() company: Company): Promise<CompanySection[]> {
        const companyId = company.id;

        return this.companySectionLoader.loader.load(companyId);
    }
}
