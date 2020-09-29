import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { CompanyMeta } from './entities/company.meta.entity';
import { CompanyPaymentMethod } from './entities/company.payment.method.entity';
import { CompanySection } from './entities/company.type.entity';
import { CompanyUser } from './entities/company.user.entity';
import { CompanyResolver } from './resolvers/company.resolver';
import { FilterHelper } from './helpers/filter.helper';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Company,
            CompanyMeta,
            CompanyPaymentMethod,
            CompanySection,
            CompanyUser,
        ]),
    ],
    providers: [CompanyService, CompanyResolver, FilterHelper],
})
export class CompanyModule {}
