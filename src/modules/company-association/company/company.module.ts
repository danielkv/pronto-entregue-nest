import { Module } from '@nestjs/common';
import { ListCompaniesService } from './services/list-companies.service';
import { QueryCompanyResolver } from './resolvers/query.company.resolver';
import { CompaniesListDTO } from './dtos/companies.list.dto';
import { CountCompaniesService } from './services/count-companies.service';

import { CompanyFilterDTO } from './dtos/company.filter.dto';

import { CompanyRepositoryProvider } from './repositories/company.repository';
import { GetCompanyService } from './services/get-company.service';
import { CompanyResolver } from './resolvers/company.resolver';
import { GetCompanyOrderTypeService } from './services/get-company-order-type.service';
import { CompanyLocationFilter } from './filters/company.location.filter';
import { CompanyActiveFilter } from './filters/company.active.filter';
import { CompanyPublishedFilter } from './filters/company.published.filter';
import { CompanySearchFilter } from './filters/company.search.filter';
import { CategoryModule } from 'src/modules/category/category.module';
import { CompanyCategoriesLoader } from './loaders/company-categories.loader';
import { CompanyCategoriesResolver } from './resolvers/company-categories.resolver';
import { UpdateCompanyService } from './services/update-company.service';
import { CreateCompanyService } from './services/create-company.service';

@Module({
    imports: [CompaniesListDTO, CompanyFilterDTO, CategoryModule],
    providers: [
        // resolvers
        CompanyResolver,
        QueryCompanyResolver,
        CompanyCategoriesResolver,

        // loaders
        CompanyCategoriesLoader,

        // services
        GetCompanyOrderTypeService,
        ListCompaniesService,
        CountCompaniesService,
        GetCompanyService,
        CreateCompanyService,
        UpdateCompanyService,

        // filters
        CompanyLocationFilter,
        CompanyActiveFilter,
        CompanyPublishedFilter,
        CompanySearchFilter,

        // repositories
        CompanyRepositoryProvider,
    ],
    exports: [CompanyRepositoryProvider, CompanyLocationFilter],
})
export class CompanyModule {}
