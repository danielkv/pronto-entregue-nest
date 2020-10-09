import { RepositoryProviderFactory } from 'src/modules/common/helpers/repository-provider.factory';
import { EntityRepository } from 'typeorm';
import { RepositoryBase } from '../../common/repositories/repository.base';
import { Address } from '../entities/address.entity';
import { IAddressRepository } from '../interfaces/address.repository.interface';

@EntityRepository(Address)
export class AddressRepository extends RepositoryBase<Address> implements IAddressRepository {}

export const AddressRepositoryProvider = new RepositoryProviderFactory('IAddressRepository', AddressRepository).create()

