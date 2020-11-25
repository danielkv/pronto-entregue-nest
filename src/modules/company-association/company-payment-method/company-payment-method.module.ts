import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { CompanyPaymentMethodDTO } from './dtos/company.payment.method.dto';
import { CompanyPaymentMethodRepository } from './repositories/company-payment-method.repository';

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([CompanyPaymentMethodRepository])],
            resolvers: [{ DTOClass: CompanyPaymentMethodDTO, EntityClass: CompanyPaymentMethodRepository }],
        }),
    ],
})
export class CompanyPaymentMethodModule {}
