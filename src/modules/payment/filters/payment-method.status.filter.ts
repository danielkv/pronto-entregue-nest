import { Injectable } from '@nestjs/common';
import { IFilter } from 'src/modules/common/interfaces/IFilter';
import { QueryBuilderBase } from 'src/modules/common/repositories/query.builder.base';
import { PaymentMethodFilterDTO } from '../dtos/payment-method.filter.dto';
import { PaymentMethod } from '../entities/payment.method.entity';

@Injectable()
export class PaymentMethodTypeFilter implements IFilter<PaymentMethod, PaymentMethodFilterDTO> {
    apply(
        query: QueryBuilderBase<PaymentMethod, PaymentMethodFilterDTO>,
        filter?: PaymentMethodFilterDTO,
    ): QueryBuilderBase<PaymentMethod, PaymentMethodFilterDTO> {
        if (!filter?.type) return query;

        return query.andWhere('paymentMethod.type IN (:...type)').setParameters({
            type: filter.type,
        });
    }
}
