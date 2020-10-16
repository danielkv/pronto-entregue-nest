import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { DataLoaderBase } from '../../common/helpers/data.loader.base';
import { IDataLoaderBase } from '../../common/interfaces/data.loader.interface';
import { Address } from '../entities/address.entity';
import { GetAddressService } from '../services/get.address.service';

@Injectable()
export class AddressLoader extends DataLoaderBase<number, Address> implements IDataLoaderBase<number, Address> {
    constructor(private readonly getAddressService: GetAddressService) {
        super();
    }

    create() {
        return new DataLoader<number, Address>(async keys => {
            const addresses = await this.getAddressService.execute([...keys]);

            return this.remap([...keys], addresses);
        });
    }
}
