import { Inject, Injectable } from '@nestjs/common';
import { PaymentMethod } from 'src/modules/payment/entities/payment.method.entity';
import { Company } from '../../company/entities/company.entity';
import { ICompanyPaymentMethodRepository } from '../interfaces/company-payment-method-repository.interface';

@Injectable()
export class UnassignCompanyPaymentMethodService {
    constructor(
        @Inject('ICompanyPaymentMethodRepository')
        private companyPaymentMethodRepository: ICompanyPaymentMethodRepository,
    ) {}
    async execute(companyId: Company['id'], paymentMethodId: PaymentMethod['id']): Promise<boolean> {
        // remove from db
        await this.companyPaymentMethodRepository.unassignPaymentMethod(companyId, paymentMethodId);

        // return success
        return true;
    }
}
