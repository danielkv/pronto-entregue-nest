import { Module } from '@nestjs/common';
import { CompanyConfigLoader } from './loaders/company.config.loader';
import { CompanyMetaRepositoryProvider } from './repositories/company-meta.repository';
import { CompanyResolver } from './resolvers/company.resolver';
import { QueryCompanyMetaResolver } from './resolvers/query.company-meta.resolver';
import { GetCompanyConfigService } from './services/get-company-config.service';
import { GetCompanyMetaService } from './services/get.company.meta.service';

@Module({
    providers: [
        // services
        GetCompanyConfigService,
        GetCompanyMetaService,

        // loaders
        CompanyConfigLoader,

        // resolvers
        CompanyResolver,
        QueryCompanyMetaResolver,

        // repositories
        CompanyMetaRepositoryProvider,
    ],
})
export class CompanyMetaModule {}
