import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NestEventEmitter } from 'nest-event';
import { IMainEvents } from 'src/main-event-emitter/main-events.interface';
import { AddressDTO } from 'src/modules/address/dtos/address.dto';
import { Address } from 'src/modules/address/entities/address.entity';
import { UpdateAddressService } from 'src/modules/address/services/update-address.service';

import { User } from '../entities/user.entity';
import { IUpdateUserAddressEvent } from '../interface/update-user-address-event.interface';
import { IUserRepository } from '../interface/user.repository.interface';

@Injectable()
export class UpdateUserAddressService {
    constructor(
        @Inject('IUserRepository') private userRepository: IUserRepository,
        private updateAddressService: UpdateAddressService,
        private readonly eventEmitter: NestEventEmitter,
    ) {}

    async execute(userId: User['id'], address: AddressDTO): Promise<Address> {
        // check if user exists
        const user = await this.userRepository.get(userId);
        if (!user) throw new NotFoundException('Esse usuário não existe');

        // update address
        const updated = await this.updateAddressService.execute(address.id, address);

        // events
        const event: IUpdateUserAddressEvent = {
            user,
            address: updated,
        };
        this.eventEmitter.strictEmitter<IMainEvents>().emit('updateUserAddress', event);

        // return address
        return updated;
    }
}
