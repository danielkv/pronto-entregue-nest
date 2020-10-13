import { Inject, Injectable } from '@nestjs/common';
import { IRepositoryFiltersOptions } from 'src/modules/common/interfaces/IRepositoryFiltersOptions';
import { PaymentMethodFilterDTO } from '../dtos/payment-method.filter.dto';
import { PaymentMethod } from '../entities/payment.method.entity';
import { PaymentMethodCompanyFilter } from '../filters/payment-method.company.filter';
import { PaymentMethodTypeFilter } from '../filters/payment-method.type.filter';
import { IPaymentMethodRepository } from '../interfaces/payment-method.repository.interface';

@Injectable()
export class CountPaymentMethodsService {
    constructor(
        @Inject('IPaymentMethodRepository') private paymentMethodRepository: IPaymentMethodRepository,
        private paymentMethodTypeFilter: PaymentMethodTypeFilter,
        private paymentMethodCompanyFilter: PaymentMethodCompanyFilter,
    ) {}

    execute(filter?: PaymentMethodFilterDTO): Promise<number> {
        const options: IRepositoryFiltersOptions<PaymentMethod, PaymentMethodFilterDTO> = {
            filter,
            filterHelpers: [this.paymentMethodTypeFilter, this.paymentMethodCompanyFilter],
        };

        return this.paymentMethodRepository.getCount(options);
    }
}
