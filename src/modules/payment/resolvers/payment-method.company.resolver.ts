import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Company } from 'src/modules/company-association/company/entities/company.entity';
import { PaymentMethod } from '../entities/payment.method.entity';
import { CompanyPaymentMethodsLoader } from '../loaders/company-payment-methods.loader';

@Resolver(() => Company)
export class PaymentMethodCompanyResolver {
    constructor(private companyPaymentMethodsLoader: CompanyPaymentMethodsLoader) {}

    @ResolveField(() => [PaymentMethod])
    paymentMethods(@Parent() company: Company) {
        const companyId: Company['id'] = company.id;

        return this.companyPaymentMethodsLoader.loader.load(companyId);
    }
}
