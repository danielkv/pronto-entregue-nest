import { Injectable } from '@nestjs/common';
import { Address } from '../entities/address.entity';
import { ListAddressesService } from '../services/list-addresses.service';
import { DataLoaderBase } from '../../common/helpers/data.loader.base';
import { IDataLoaderBase } from '../../common/interfaces/data.loader.interface';
import { IDataLoaderCreate } from 'src/modules/common/interfaces/data-loader-create.interface';

@Injectable()
export class UserAddressesLoader extends DataLoaderBase<number, Address[]>
    implements IDataLoaderBase<number, Address[]> {
    constructor(private listAddressesService: ListAddressesService) {
        super();
    }

    create(): IDataLoaderCreate<number, Address[]> {
        return {
            batchLoadFn: async keys => {
                const allAdresses = await this.listAddressesService.execute({ userId: [...keys] });

                return keys.map(key => {
                    return allAdresses.filter(address => address.users.filter(user => user.id === key).length);
                });
            },
        };
    }
}
