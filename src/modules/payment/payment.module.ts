import { Module } from '@nestjs/common';
import { PaymentMethodFilterDTO } from './dtos/payment-method.filter.dto';
import { PaymentMethodRepositoryProvider } from './repositories/payment-method.repository';

@Module({ imports: [PaymentMethodFilterDTO], providers: [PaymentMethodRepositoryProvider] })
export class PaymentModule {}
