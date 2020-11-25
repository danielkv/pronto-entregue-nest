import { Module } from '@nestjs/common';
import { PaymentMethodRepositoryProvider } from './repositories/payment-method.repository';

@Module({
    providers: [
        // repositoris
        PaymentMethodRepositoryProvider,
    ],
})
export class PaymentModule {}
