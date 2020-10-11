import { Args, Info, Query, Resolver } from '@nestjs/graphql';
import { ExtractFieldsPipe } from 'src/modules/common/pipes/extract-fields.pipe';
import { PageInfo } from 'src/modules/common/types/page-info';
import { CompanySectionFilterDTO } from '../dtos/company-section.filter.dto';
import { CompanySectionsListDTO } from '../dtos/company-sections.list.dto';
import { CountCompanySectionsService } from '../services/count-company-sections.service';
import { ListCompanySectionsService } from '../services/list-company-sections.service';

@Resolver()
export class QueryCompanySectionResolver {
    constructor(
        private listCompanySectionsService: ListCompanySectionsService,
        private countCompanySectionsService: CountCompanySectionsService,
    ) {}

    @Query(() => CompanySectionsListDTO)
    async listSections(
        @Info(ExtractFieldsPipe) fields: string[],
        @Args('filter', { nullable: true }) filter?: CompanySectionFilterDTO,
        @Args('pagination', { nullable: true }) pagination?: PageInfo,
    ): Promise<CompanySectionsListDTO> {
        const list: CompanySectionsListDTO = { pageInfo: pagination };

        if (fields.includes('items')) list.items = await this.listCompanySectionsService.execute(filter, pagination);

        if (fields.includes('countItems')) list.countItems = await this.countCompanySectionsService.execute(filter);

        return list;
    }
}
