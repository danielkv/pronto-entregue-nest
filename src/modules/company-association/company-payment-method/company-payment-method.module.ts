import { Module } from '@nestjs/common';
import { PaymentModule } from 'src/modules/payment/payment.module';
import { CompanyModule } from '../company/company.module';
import { CompanyPaymentMethodRepositoryProvider } from './repositories/company-payment-method.repository';
import { AssignCompanyPaymentMethodService } from './services/assign-company-payment-method.service';
import { UnassignCompanyPaymentMethodService } from './services/unassign-company-payment-method.service';

@Module({
    imports: [CompanyModule, PaymentModule],
    providers: [
        // services
        AssignCompanyPaymentMethodService,
        UnassignCompanyPaymentMethodService,

        // repositories
        CompanyPaymentMethodRepositoryProvider,
    ],
})
export class CompanyPaymentMethodModule {}
