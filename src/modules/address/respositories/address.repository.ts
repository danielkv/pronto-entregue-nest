import { FactoryProvider } from '@nestjs/common';
import { Connection, EntityRepository } from 'typeorm';
import { RepositoryBase } from '../../common/repositories/repository.base';
import { Address } from '../entities/address.entity';
import { IAddressRepository } from '../interfaces/address.repository.interface';

@EntityRepository(Address)
export class AddressRepository extends RepositoryBase<Address> implements IAddressRepository {}

export const AddressRepositoryProvider: FactoryProvider<AddressRepository> = {
    provide: 'IAddressRepository',
    useFactory: (connection: Connection) => connection.getCustomRepository(AddressRepository),
    inject: [Connection],
};
