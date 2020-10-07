import { EntityRepository } from 'typeorm';
import { RepositoryBase } from '../../common/repositories/repository.base';
import { Address } from '../entities/address.entity';

@EntityRepository(Address)
export class AddressRepository extends RepositoryBase<Address> {}
