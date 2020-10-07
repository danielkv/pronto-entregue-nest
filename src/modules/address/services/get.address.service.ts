import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from '../entities/address.entity';
import { AddressRepository } from '../respositories/address.repository';

@Injectable()
export class GetAddressService {
    constructor(
        @InjectRepository(AddressRepository)
        private addressRepository: AddressRepository,
    ) {}

    async execute(addressId: number): Promise<Address>;
    async execute(addressId: number[]): Promise<Address[]>;
    async execute(addressId: any): Promise<Address | Address[]> {
        const query = this.addressRepository.createQueryBuilder('address');

        // apply filter
        query.whereInIds(addressId);

        // get results
        const addresses = await query.getMany();

        if (Array.isArray(addressId)) return addresses;
        else return addresses[0];
    }
}
