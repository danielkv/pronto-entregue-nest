import { Module } from '@nestjs/common';
import { AddressResolver } from './resolvers/address.resolver';
import { CompanyAddressResolver } from './resolvers/company-address.resolver';
import { AddressService } from './address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './address.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Address])],
    providers: [AddressService, AddressResolver, CompanyAddressResolver],
})
export class AddressModule {}
