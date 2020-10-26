import { Module } from '@nestjs/common';
import { AddressResolver } from './resolvers/address.resolver';
import { CompanyAddressResolver } from './resolvers/company-address.resolver';
import { GetAddressService } from './services/get.address.service';
import { AddressRepositoryProvider } from './respositories/address.repository';
import { AddressLoader } from './loaders/address.loader';
import { AddressUserFilter } from './filters/address.user.filter';
import { ListAddressesService } from './services/list-addresses.service';
import { UserAddressesLoader } from './loaders/user-address.loader';
import { UserResolver } from './resolvers/user.resolver';
import { CreateAddressService } from './services/create-address.service';
import { UpdateAddressService } from './services/update-address.service';

@Module({
    providers: [
        // resolvers
        CompanyAddressResolver,
        AddressResolver,
        UserResolver,

        // filters
        AddressUserFilter,

        // loaders
        AddressLoader,
        UserAddressesLoader,

        // services
        GetAddressService,
        ListAddressesService,
        CreateAddressService,
        UpdateAddressService,

        // repositories
        AddressRepositoryProvider,
    ],
    exports: [CreateAddressService, UpdateAddressService, ListAddressesService],
})
export class AddressModule {}
