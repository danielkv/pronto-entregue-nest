import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { CompanyDTO } from './dtos/company.dto';
import { CompanyLocationFilter } from './filters/company.location.filter';
import { CompanyRepository } from './repositories/company.repository';
import { CompanyQueryResolver } from './resolvers/company.resolver';
import { CompanyService } from './services/company.service';

const companyTypeOrmModule = NestjsQueryTypeOrmModule.forFeature([CompanyRepository]);

@Module({
    providers: [CompanyQueryResolver],
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [companyTypeOrmModule],
            services: [CompanyService, CompanyLocationFilter],

            resolvers: [
                {
                    DTOClass: CompanyDTO,
                    EntityClass: CompanyRepository,
                    ServiceClass: CompanyService,
                    read: { disabled: true },
                    delete: { disabled: true },
                },
            ],
        }),
        companyTypeOrmModule,
    ],
    exports: [companyTypeOrmModule],
})
export class CompanyModule {}
