import { Module } from '@nestjs/common';
import { PaymentModule } from 'src/modules/payment/payment.module';
import { CompanyModule } from '../company/company.module';
import { CompanyPaymentMethodRepositoryProvider } from './repositories/company-payment-method.repository';

@Module({
    imports: [CompanyModule, PaymentModule],
    providers: [
        // repositories
        CompanyPaymentMethodRepositoryProvider,
    ],
})
export class CompanyPaymentMethodModule {}
