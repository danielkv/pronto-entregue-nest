import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NestEventEmitter } from 'nest-event';
import { IMainEvents } from 'src/main-event-emitter/main-events.interface';
import { AddressDTO } from 'src/modules/address/dtos/address.dto';
import { Address } from 'src/modules/address/entities/address.entity';
import { IAddressRepository } from 'src/modules/address/interfaces/address.repository.interface';
import { AddressRepository } from 'src/modules/address/respositories/address.repository';
import { CreateAddressService } from 'src/modules/address/services/create-address.service';
import { TransactionHelper } from 'src/modules/common/helpers/transactionHelper';

import { User } from '../entities/user.entity';
import { IAddUserAddressEvent } from '../interface/add-user-address-event.interface';
import { IUserRepository } from '../interface/user.repository.interface';

@Injectable()
export class AddUserAddressService {
    constructor(
        @Inject('IUserRepository') private userRepository: IUserRepository,
        private transactionHelper: TransactionHelper,
        private readonly eventEmitter: NestEventEmitter,
    ) {}

    async execute(userId: User['id'], address: AddressDTO): Promise<Address> {
        // check if user exists
        const user = await this.userRepository.get(userId);
        if (!user) throw new NotFoundException('Esse usuário não existe');

        // start transaction
        const created = await this.transactionHelper.execute<Address>(async manager => {
            // create address
            const addressRepository: IAddressRepository = manager.getCustomRepository(AddressRepository);
            const createAddressService = new CreateAddressService(addressRepository, this.eventEmitter);
            const newAddress = await createAddressService.execute(address);

            // assign address to user
            await this.userRepository.addAddress(userId, newAddress.id);

            return newAddress;
        });

        // events
        const event: IAddUserAddressEvent = {
            user,
            address: created,
        };
        this.eventEmitter.strictEmitter<IMainEvents>().emit('createUser', event);

        // return address
        return created;
    }
}
