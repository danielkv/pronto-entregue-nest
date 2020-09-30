import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Company } from '../../company/entities/company.entity';
import { Address } from '../address.entity';
import { AddressService } from '../address.service';

@Resolver(() => Company)
export class CompanyAddressResolver {
    constructor(private addressService: AddressService) {}

    @ResolveField('address', () => Address)
    getAddress(@Parent() company: Company) {
        return this.addressService.findOne(company.addressId);
    }
}
