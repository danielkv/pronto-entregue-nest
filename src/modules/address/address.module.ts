import { Module } from '@nestjs/common';
import { AddressResolver } from './resolvers/address.resolver';
import { CompanyAddressResolver } from './resolvers/company-address.resolver';
import { GetAddressService } from './services/get.address.service';
import { AddressRepositoryProvider } from './respositories/address.repository';
import { AddressLoader } from './loaders/address.loader';
import { AddressUserFilter } from './filters/address.user.filter';
import { ListAddressesService } from './services/list-addresses.service';

@Module({
    providers: [
        // resolvers
        CompanyAddressResolver,
        AddressResolver,

        // filters
        AddressUserFilter,

        // loaders
        AddressLoader,

        // services
        GetAddressService,
        ListAddressesService,

        // repositories
        AddressRepositoryProvider,
    ],
    exports: [ListAddressesService],
})
export class AddressModule {}
