import { Inject, Injectable } from '@nestjs/common';
import { NestEventEmitter } from 'nest-event';
import { IMainEvents } from 'src/main-event-emitter/main-events.interface';
import { AddressDTO } from '../dtos/address.dto';
import { Address } from '../entities/address.entity';
import { ICreateAddressEvent } from '../interfaces/create-address-event.interface';
import { IAddressRepository } from '../interfaces/address.repository.interface';

@Injectable()
export class CreateAddressService {
    constructor(
        @Inject('IAddressRepository') private addressRepository: IAddressRepository,
        private eventEmitter: NestEventEmitter,
    ) {}

    async execute(address: AddressDTO): Promise<Address> {
        // create instance
        const addressInstance = this.addressRepository.create(address);

        // save instance
        const created = await this.addressRepository.save(addressInstance);

        // events
        const event: ICreateAddressEvent = {
            address: created,
        };
        this.eventEmitter.strictEmitter<IMainEvents>().emit('createAddress', event);

        // return address
        return created;
    }
}
