import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { PaymentMethod } from '../entities/payment.method.entity';
import { DataLoaderBase } from '../../common/helpers/data.loader.base';
import { IDataLoaderBase } from '../../common/interfaces/data.loader.interface';
import { ListPaymentMethodsService } from '../services/list-payment-methods.service';

@Injectable()
export class CompanyPaymentMethodsLoader extends DataLoaderBase<number, PaymentMethod[]>
    implements IDataLoaderBase<number, PaymentMethod[]> {
    constructor(private listPaymentMethodsService: ListPaymentMethodsService) {
        super();
    }

    create() {
        return new DataLoader<number, PaymentMethod[]>(async keys => {
            const allPaymentMethods = await this.listPaymentMethodsService.execute({ companyId: [...keys] });

            return keys.map(key => {
                return allPaymentMethods.filter(
                    paymentMethod =>
                        paymentMethod.companyPaymentMethods &&
                        paymentMethod.companyPaymentMethods.filter(
                            companyPaymentMethod => companyPaymentMethod.companyId === key,
                        ).length,
                );
            });
        });
    }
}
