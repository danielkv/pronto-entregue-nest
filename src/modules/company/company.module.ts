import { Module } from '@nestjs/common';
import { ListCompaniesService } from './services/list-companies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyMeta } from './entities/company.meta.entity';
import { CompanyPaymentMethod } from './entities/company.payment.method.entity';
import { CompanySection } from './entities/company.type.entity';
import { CompanyUser } from './entities/company.user.entity';
import { QueryCompanyResolver } from './resolvers/query.company.resolver';
import { CompaniesList } from './dtos/companies.list';
import { CountCompaniesService } from './services/count-companies.service';
import { GetCompanyConfigService } from './services/get-company-config.service';
import { GetCompanyService } from './services/get-company.service';
import { GetCompanyMetaService } from './services/get.company.meta.service';
import { CompanyResolver } from './resolvers/company.resolver';
import { CompanyConfigLoader } from './loaders/company.config.loader';

import { CompanyFilter } from './dtos/company.filter';
import { CompanyConfig } from './dtos/company.config';

import { CompanyRepository } from './repositories/company.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CompanyRepository,
            CompanyMeta,
            CompanyPaymentMethod,
            CompanySection,
            CompanyUser,
        ]),
        CompaniesList,
        CompanyFilter,
        CompanyConfig,
    ],
    providers: [
        QueryCompanyResolver,
        CompanyResolver,

        ListCompaniesService,
        CountCompaniesService,

        GetCompanyService,
        GetCompanyConfigService,
        GetCompanyMetaService,
        CompanyConfigLoader,
    ],
})
export class CompanyModule {}
