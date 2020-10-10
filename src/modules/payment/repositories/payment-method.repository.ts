import { RepositoryProviderFactory } from '../../common/helpers/repository-provider.factory';
import { RepositoryBase } from '../../common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { PaymentMethodFilterDTO } from '../dtos/payment-method.filter.dto';
import { PaymentMethod } from '../entities/payment.method.entity';
import { PaymentMethodTypeFilter } from '../filters/payment-method.status.filter';
import { PaymentMethodCompanyFilter } from '../filters/payment-method.company.filter';
import { IPaymentMethodRepository } from '../interfaces/payment-method.repository.interface';

@EntityRepository(PaymentMethod)
export class PaymentMethodRepository extends RepositoryBase<PaymentMethod, PaymentMethodFilterDTO>
    implements IPaymentMethodRepository {
    constructor() {
        super();

        this.setQueryBuilderTableName('paymentMethod');

        this.setFilters([new PaymentMethodTypeFilter(), new PaymentMethodCompanyFilter()]);
    }
}

export const PaymentMethodRepositoryProvider = new RepositoryProviderFactory(
    'IPaymentMethodRepository',
    PaymentMethodRepository,
).create();
