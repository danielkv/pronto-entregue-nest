import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { Address } from '../entities/address.entity';
import { ListAddressesService } from '../services/list-addresses.service';
import { DataLoaderBase } from '../../common/helpers/data.loader.base';
import { IDataLoaderBase } from '../../common/interfaces/data.loader.interface';

@Injectable()
export class UserAddressesLoader extends DataLoaderBase<number, Address[]>
    implements IDataLoaderBase<number, Address[]> {
    constructor(private listAddressesService: ListAddressesService) {
        super();
    }

    create() {
        return new DataLoader<number, Address[]>(async keys => {
            const allAdresses = await this.listAddressesService.execute({ userId: [...keys] });

            return keys.map(key => {
                return allAdresses.filter(address => address.users.filter(user => user.id === key).length);
            });
        });
    }
}
