import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Company } from '../../company/entities/company.entity';
import { CompanySection } from '../entities/company.type.entity';
import { ListCompanySectionsService } from '../services/list-company-sections.service';

@Resolver(() => Company)
export class CompanySectionResolver {
    constructor(private listCompanySectionService: ListCompanySectionsService) {}
    @ResolveField(() => [CompanySection])
    sections(@Parent() company: Company): Promise<CompanySection[]> {
        const companyId = company.id;

        return this.listCompanySectionService.execute({ companyId });
    }
}
