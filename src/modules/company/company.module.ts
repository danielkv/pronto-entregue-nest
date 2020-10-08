import { Module } from '@nestjs/common';
import { ListCompaniesService } from './services/list-companies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyMeta } from './entities/company.meta.entity';
import { QueryCompanyResolver } from './resolvers/query.company.resolver';
import { CompaniesList } from './dtos/companies.list';
import { CountCompaniesService } from './services/count-companies.service';
import { GetCompanyConfigService } from './services/get-company-config.service';
import { GetCompanyService } from './services/get-company.service';
import { GetCompanyMetaService } from './services/get.company.meta.service';
import { CompanyResolver } from './resolvers/company.resolver';
import { CompanyConfigLoader } from './loaders/company.config.loader';

import { CompanyFilterDTO } from './dtos/company.filter';
import { CompanyConfig } from './dtos/company.config';

import { CompanyRepositoryProvider } from './repositories/company.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([CompanyMeta]),
        CompaniesList,
        CompanyFilterDTO,
        CompanyConfig,
    ],
    providers: [
        // resolvers
        QueryCompanyResolver,
        CompanyResolver,

        // services
        ListCompaniesService,
        CountCompaniesService,

        GetCompanyService,
        GetCompanyConfigService,
        GetCompanyMetaService,
        CompanyConfigLoader,

        CompanyRepositoryProvider,
    ],
})
export class CompanyModule {}
