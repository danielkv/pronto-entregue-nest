import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NestEventEmitter } from 'nest-event';
import { IMainEvents } from 'src/main-event-emitter/main-events.interface';
import { AddressDTO } from '../dtos/address.dto';
import { Address } from '../entities/address.entity';
import { IAddressRepository } from '../interfaces/address.repository.interface';
import { IUpdateAddressEvent } from '../interfaces/update-address-event.interface';

@Injectable()
export class UpdateAddressService {
    constructor(
        @Inject('IAddressRepository') private addressRepository: IAddressRepository,
        private eventEmitter: NestEventEmitter,
    ) {}

    async execute(addressId: AddressDTO['id'], address: AddressDTO): Promise<Address> {
        const oldAddress = await this.addressRepository.get(addressId);
        if (!oldAddress) throw new NotFoundException('Esse endereço não existe');

        // create instance
        const addressInstance = this.addressRepository.merge(oldAddress, address);

        // save instance
        const updated = await this.addressRepository.save(addressInstance);

        // events
        const event: IUpdateAddressEvent = {
            address: updated,
        };
        this.eventEmitter.strictEmitter<IMainEvents>().emit('updateAddress', event);

        // return address
        return updated;
    }
}
