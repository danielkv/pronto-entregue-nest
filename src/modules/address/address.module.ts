import { Module } from '@nestjs/common';
import { AddressResolver } from './resolvers/address.resolver';
import { CompanyAddressResolver } from './resolvers/company-address.resolver';
import { GetAddressService } from './services/get.address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressRepository } from './respositories/address.repository';
import { AddressLoader } from './loaders/address.loader';

@Module({
    imports: [TypeOrmModule.forFeature([AddressRepository])],
    providers: [GetAddressService, AddressResolver, CompanyAddressResolver, AddressLoader],
})
export class AddressModule {}
