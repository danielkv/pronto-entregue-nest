import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Company } from '../../company/entities/company.entity';
import { Address } from '../entities/address.entity';
import { AddressLoader } from '../loaders/address.loader';

@Resolver(() => Company)
export class CompanyAddressResolver {
    constructor(private addressLoader: AddressLoader) {}

    @ResolveField('address', () => Address)
    getAddress(@Parent() company: Company) {
        return this.addressLoader.loader.load(company.addressId);
    }
}
