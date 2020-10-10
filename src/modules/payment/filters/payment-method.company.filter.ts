import { Injectable } from '@nestjs/common';
import { IFilter } from '../../common/interfaces/IFilter';
import { QueryBuilderBase } from '../../common/repositories/query.builder.base';
import { PaymentMethodFilterDTO } from '../dtos/payment-method.filter.dto';
import { PaymentMethod } from '../entities/payment.method.entity';

@Injectable()
export class PaymentMethodCompanyFilter implements IFilter<PaymentMethod, PaymentMethodFilterDTO> {
    apply(
        query: QueryBuilderBase<PaymentMethod, PaymentMethodFilterDTO>,
        filter?: PaymentMethodFilterDTO,
    ): QueryBuilderBase<PaymentMethod, PaymentMethodFilterDTO> {
        if (!filter?.companyId) return query;

        const companyIds: PaymentMethodFilterDTO['companyId'][] = !Array.isArray(filter.companyId)
            ? [filter.companyId]
            : filter.companyId;

        query.leftJoinAndSelect('paymentMethod.companyPaymentMethods', 'companyPaymentMethod');

        return query.andWhere('companyPaymentMethod.companyId IN (:...companyIds)').setParameters({ companyIds });
    }
}
