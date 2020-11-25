import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PaymentMethod } from 'src/modules/payment/entities/payment.method.entity';
import { IPaymentMethodRepository } from 'src/modules/payment/interfaces/payment-method.repository.interface';
import { Company } from '../../company/entities/company.entity';
//import { GetCompanyService } from '../../company/services/get-company.service';
import { ICompanyPaymentMethodRepository } from '../interfaces/company-payment-method-repository.interface';
import { IPaymentMethodSettings } from '../interfaces/payment-method-setting.interface';

@Injectable()
export class AssignCompanyPaymentMethodService {
    constructor(
        @Inject('IPaymentMethodRepository') private paymentMethodRepository: IPaymentMethodRepository,
        @Inject('ICompanyPaymentMethodRepository')
        private companyPaymentMethodRepository: ICompanyPaymentMethodRepository,
    ) //private getCompanyService: GetCompanyService,
    {}
    async execute(
        companyId: Company['id'],
        paymentMethodId: PaymentMethod['id'],
        settings: IPaymentMethodSettings,
    ): Promise<PaymentMethod> {
        // check if company exists
        const company = null; //await this.getCompanyService.execute(companyId);
        if (!company) throw new NotFoundException('Empresa não existe');

        // check if payment method exists
        const paymentMethod = await this.paymentMethodRepository.get(paymentMethodId);
        if (!paymentMethod) throw new NotFoundException('Método de pagamento não existe');

        // create instance
        const companyPaymentMethodInstance = this.companyPaymentMethodRepository.create({
            companyId,
            paymentMethodId,
            settings: JSON.stringify(settings),
        });

        // save instance
        await this.companyPaymentMethodRepository.save(companyPaymentMethodInstance);

        // return instance
        return paymentMethod;
    }
}
