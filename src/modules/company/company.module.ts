import { Module } from '@nestjs/common';
import { CompanyService } from './services/company.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { CompanyMeta } from './entities/company.meta.entity';
import { CompanyPaymentMethod } from './entities/company.payment.method.entity';
import { CompanySection } from './entities/company.type.entity';
import { CompanyUser } from './entities/company.user.entity';
import { CompanyResolver } from './resolvers/company.resolver';
import { FilterSearch } from './helpers/filter.search';
import { ListCompanies } from './types/list-companies';

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
    providers: [CompanyService, CompanyResolver, FilterSearch],
})
export class CompanyModule {}
