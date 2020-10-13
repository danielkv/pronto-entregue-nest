import { IRepositoryBase } from '../../common/interfaces/repository.base.interface';
import { AddressFilterDTO } from '../dtos/address.filter.dto';
import { Address } from '../entities/address.entity';

export interface IAddressRepository extends IRepositoryBase<Address, AddressFilterDTO> {}
