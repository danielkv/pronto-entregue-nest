import { Inject, Injectable } from '@nestjs/common';
import { Address } from '../entities/address.entity';
import { IAddressRepository } from '../interfaces/address.repository.interface';

@Injectable()
export class GetAddressService {
    constructor(
        @Inject('IAddressRepository')
        private addressRepository: IAddressRepository,
    ) {}

    async execute(addressId: number): Promise<Address>;
    async execute(addressId: number[]): Promise<Address[]>;
    async execute(addressId: any): Promise<Address | Address[]> {
        return this.addressRepository.get(addressId);
    }
}
