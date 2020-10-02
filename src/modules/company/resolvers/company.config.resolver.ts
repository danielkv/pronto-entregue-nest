import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CompanyConfig } from '../types/company-config';

@Resolver(() => CompanyConfig)
export class CompanyConfigResolver {
    @ResolveField()
    phone(@Parent() companyId: number) {
        return companyId;
    }

    document: string;

    contact: string;

    email: string;

    deliveryTime: string;

    notificationSound: string;

    deliveryType: string;

    allowBuyClosed: boolean;

    allowBuyClosedTimeBefore: number;

    deliveryHoursEnabled: boolean;
}
