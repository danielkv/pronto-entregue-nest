import { Module } from '@nestjs/common';
import { PaymentMethodFilterDTO } from './dtos/payment-method.filter.dto';
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
