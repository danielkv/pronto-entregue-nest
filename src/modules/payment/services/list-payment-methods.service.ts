import { Inject, Injectable } from '@nestjs/common';
import { IRepositoryListOptions } from 'src/modules/common/interfaces/IRepositoryListOptions';
import { PageInfo } from '../../common/types/page-info';
import { PaymentMethodFilterDTO } from '../dtos/payment-method.filter.dto';
import { PaymentMethod } from '../entities/payment.method.entity';
import { PaymentMethodCompanyFilter } from '../filters/payment-method.company.filter';
import { PaymentMethodTypeFilter } from '../filters/payment-method.type.filter';
import { IPaymentMethodRepository } from '../interfaces/payment-method.repository.interface';

@Injectable()
export class ListPaymentMethodsService {
    constructor(
        @Inject('IPaymentMethodRepository') private paymentMethodRepository: IPaymentMethodRepository,
        private paymentMethodTypeFilter: PaymentMethodTypeFilter,
        private paymentMethodCompanyFilter: PaymentMethodCompanyFilter,
    ) {}

    execute(filter?: PaymentMethodFilterDTO, pagination?: PageInfo): Promise<PaymentMethod[]> {
        const options: IRepositoryListOptions<PaymentMethod, PaymentMethodFilterDTO> = {
            pagination,
            filter,
            filterHelpers: [this.paymentMethodTypeFilter, this.paymentMethodCompanyFilter],
        };

        return this.paymentMethodRepository.getList(options);
    }
}
