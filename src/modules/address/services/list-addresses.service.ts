import { Inject, Injectable } from '@nestjs/common';
import { IRepositoryListOptions } from 'src/modules/common/interfaces/IRepositoryListOptions';
import { PageInfo } from 'src/modules/common/types/page-info';
import { AddressFilterDTO } from '../dtos/address.filter.dto';
import { Address } from '../entities/address.entity';
import { AddressUserFilter } from '../filters/address.user.filter';
import { IAddressRepository } from '../interfaces/address.repository.interface';

@Injectable()
export class ListAddressesService {
    constructor(
        @Inject('IAddressRepository')
        private addressRepository: IAddressRepository,
        private addressUserFilter: AddressUserFilter,
    ) {}

    async execute(filter?: AddressFilterDTO, pagination?: PageInfo): Promise<Address[]> {
        const options: IRepositoryListOptions<Address, AddressFilterDTO> = {
            pagination,
            filter,
            filterHelpers: [this.addressUserFilter],
        };

        return this.addressRepository.getList(options);
    }
}
