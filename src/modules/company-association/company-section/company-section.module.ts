import { Module } from '@nestjs/common';
import { CompanyModule } from '../company/company.module';
import { CompanySectionActiveFilter } from './filters/company-section.active.filter';
import { CompanySectionCompanyFilter } from './filters/company-section.company.filter';
import { CompanySectionLocationFilter } from './filters/company-section.location.filter';
import { CompanySectionSearchFilter } from './filters/company-section.search.filter';
import { CompanySectionLoader } from './loaders/company-section.loader';
import { CompanySectionRepositoryProvider } from './repositories/company-section.repository';
import { CompanySectionResolver } from './resolvers/company-section.resolver';
import { QueryCompanySectionResolver } from './resolvers/query-company-section.resolver';
import { ListCompanySectionsService } from './services/list-company-sections.service';
import { CompanySectionsListDTO } from './dtos/company-sections.list.dto';
import { CompanySectionFilterDTO } from './dtos/company-section.filter.dto';
import { CountCompanySectionsService } from './services/count-company-sections.service';
import { CreateSectionService } from './services/create-section.service';
import { UpdateSectionService } from './services/update-section.service';

@Module({
    imports: [CompanySectionsListDTO, CompanySectionFilterDTO, CompanyModule],
    providers: [
        // services
        ListCompanySectionsService,
        CountCompanySectionsService,
        CreateSectionService,
        UpdateSectionService,

        // loaders
        CompanySectionLoader,

        // resolvers
        QueryCompanySectionResolver,
        CompanySectionResolver,

        // filters
        CompanySectionActiveFilter,
        CompanySectionSearchFilter,
        CompanySectionCompanyFilter,
        CompanySectionLocationFilter,

        // repositories
        CompanySectionRepositoryProvider,
    ],
})
export class CompanySectionModule {}
