import { Args, Info, Query, Resolver } from '@nestjs/graphql';
import { ExtractFieldsPipe } from 'src/modules/common/pipes/extract-fields.pipe';
import { PageInfo } from 'src/modules/common/types/page-info';
import { PaymentMethodFilterDTO } from '../dtos/payment-method.filter.dto';
import { PaymentMethodsList } from '../dtos/payment-methods.list.dto';
import { ListPaymentMethodsService } from '../services/list-payment-methods.service';
import { CountPaymentMethodsService } from '../services/count-payment-methods.service';

@Resolver()
export class QueryPaymentMethodResolver {
    constructor(
        private listPaymentMethodsService: ListPaymentMethodsService,
        private countPaymentMethodsService: CountPaymentMethodsService,
    ) {}

    @Query(() => PaymentMethodsList)
    async listPaymentMethods(
        @Info(ExtractFieldsPipe) fields: string[],
        @Args('filter', { nullable: true }) filter?: PaymentMethodFilterDTO,
        @Args('pagination', { nullable: true }) pagination?: PageInfo,
    ): Promise<PaymentMethodsList> {
        const list: PaymentMethodsList = { pageInfo: pagination };

        if (fields.includes('items')) list.items = await this.listPaymentMethodsService.execute(filter, pagination);

        if (fields.includes('countItems')) list.countItems = await this.countPaymentMethodsService.execute(filter);

        return list;
    }
}
