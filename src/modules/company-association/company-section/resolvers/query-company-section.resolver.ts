import { Args, Query, Resolver } from '@nestjs/graphql';
import { PageInfo } from 'src/modules/common/types/page-info';
import { CompanySectionFilterDTO } from '../dtos/company-section.filter.dto';
import { CompanySection } from '../entities/company.type.entity';
import { ListCompanySectionsService } from '../services/list-company-sections.service';

@Resolver()
export class QueryCompanySectionResolver {
    constructor(private listCompanySectionsService: ListCompanySectionsService) {}

    @Query(() => [CompanySection])
    sections(
        @Args('filter', { nullable: true }) filter?: CompanySectionFilterDTO,
        @Args('pagination', { nullable: true }) pagination?: PageInfo,
    ): Promise<CompanySection[]> {
        return this.listCompanySectionsService.execute(filter, pagination);
    }
}
