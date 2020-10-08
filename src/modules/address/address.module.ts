import { Module } from '@nestjs/common';
import { AddressResolver } from './resolvers/address.resolver';
import { CompanyAddressResolver } from './resolvers/company-address.resolver';
import { GetAddressService } from './services/get.address.service';
import { AddressRepositoryProvider } from './respositories/address.repository';
import { AddressLoader } from './loaders/address.loader';

@Module({
    providers: [
        // resolvers
        CompanyAddressResolver,
        AddressResolver,

        // loaders
        AddressLoader,

        // services
        GetAddressService,

        // repositories
        AddressRepositoryProvider,
    ],
})
export class AddressModule {}
