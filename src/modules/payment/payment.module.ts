import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { PaymentMethodDTO } from './dtos/payment.method.dto';
import { PaymentMethodRepository } from './repositories/payment-method.repository';

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([PaymentMethodRepository])],
            resolvers: [{ DTOClass: PaymentMethodDTO, EntityClass: PaymentMethodRepository }],
        }),
    ],
})
export class PaymentModule {}
