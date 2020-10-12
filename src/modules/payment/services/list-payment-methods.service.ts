import { Inject, Injectable } from '@nestjs/common';
import { PageInfo } from '../../common/types/page-info';
import { PaymentMethodFilterDTO } from '../dtos/payment-method.filter.dto';
import { PaymentMethod } from '../entities/payment.method.entity';
import { IPaymentMethodRepository } from '../interfaces/payment-method.repository.interface';

@Injectable()
export class ListPaymentMethodsService {
    constructor(@Inject('IPaymentMethodRepository') private paymentMethodRepository: IPaymentMethodRepository) {}

    execute(filter?: PaymentMethodFilterDTO, pagination?: PageInfo): Promise<PaymentMethod[]> {
        return this.paymentMethodRepository.getList({ filter, pagination });
    }
}
