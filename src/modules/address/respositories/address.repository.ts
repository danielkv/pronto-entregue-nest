import { RepositoryProviderFactory } from '../../common/helpers/repository-provider.factory';
import { EntityRepository } from 'typeorm';
import { RepositoryBase } from '../../common/repositories/repository.base';
import { Address } from '../entities/address.entity';
import { IAddressRepository } from '../interfaces/address.repository.interface';
import { AddressFilterDTO } from '../dtos/address.filter.dto';

@EntityRepository(Address)
export class AddressRepository extends RepositoryBase<Address, AddressFilterDTO> implements IAddressRepository {
    constructor() {
        super();

        this.setQueryBuilderTableName('address');
    }
}

export const AddressRepositoryProvider = new RepositoryProviderFactory(
    'IAddressRepository',
    AddressRepository,
).create();
