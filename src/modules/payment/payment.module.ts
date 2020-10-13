import { Module } from '@nestjs/common';
import { PaymentMethodFilterDTO } from './dtos/payment-method.filter.dto';
import { PaymentMethodCompanyFilter } from './filters/payment-method.company.filter';
import { PaymentMethodTypeFilter } from './filters/payment-method.type.filter';
import { CompanyPaymentMethodsLoader } from './loaders/company-payment-methods.loader';
import { PaymentMethodRepositoryProvider } from './repositories/payment-method.repository';
import { PaymentMethodCompanyResolver } from './resolvers/payment-method.company.resolver';
import { QueryPaymentMethodResolver } from './resolvers/query-payment-method.resolver';
import { CountPaymentMethodsService } from './services/count-payment-methods.service';
import { ListPaymentMethodsService } from './services/list-payment-methods.service';

@Module({
    imports: [PaymentMethodFilterDTO],
    providers: [
        // services
        ListPaymentMethodsService,
        CountPaymentMethodsService,

        // filters
        PaymentMethodCompanyFilter,
        PaymentMethodTypeFilter,

        // loaders
        CompanyPaymentMethodsLoader,

        // resolvers
        QueryPaymentMethodResolver,
        PaymentMethodCompanyResolver,

        // repositoris
        PaymentMethodRepositoryProvider,
    ],
})
export class PaymentModule {}
