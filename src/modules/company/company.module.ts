import { Module } from '@nestjs/common';
import { ListCompanyService } from './services/list-companies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { CompanyMeta } from './entities/company.meta.entity';
import { CompanyPaymentMethod } from './entities/company.payment.method.entity';
import { CompanySection } from './entities/company.type.entity';
import { CompanyUser } from './entities/company.user.entity';
import { CompanyResolver } from './resolvers/company.resolver';
import { FilterSearch } from './helpers/filter.search';
import { ListCompanies } from './types/list-companies';
import { CountCompaniesService } from './services/count-companies.service';
import { SelectionHelper } from './helpers/company-selection';
import { CompanyMapper } from './helpers/company-mapper';
import { FilterLocation } from './helpers/filter.location';
import { CompanyFilterHelper } from './helpers/company-filter-helper';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Company,
            CompanyMeta,
            CompanyPaymentMethod,
            CompanySection,
            CompanyUser,
        ]),
        ListCompanies,
    ],
    providers: [
        ListCompanyService,
        CompanyResolver,
        CountCompaniesService,
        SelectionHelper,
        CompanyMapper,
        FilterSearch,
        FilterLocation,
        CompanyFilterHelper,
    ],
})
export class CompanyModule {}
