import { Inject, Injectable } from '@nestjs/common';
import { PaymentMethodFilterDTO } from '../dtos/payment-method.filter.dto';
import { IPaymentMethodRepository } from '../interfaces/payment-method.repository.interface';

@Injectable()
export class CountPaymentMethodsService {
    constructor(@Inject('IPaymentMethodRepository') private paymentMethodRepository: IPaymentMethodRepository) {}

    execute(filter?: PaymentMethodFilterDTO): Promise<number> {
        return this.paymentMethodRepository.getCount(filter);
    }
}
