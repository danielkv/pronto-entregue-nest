import { Injectable } from '@nestjs/common';
import { DataLoaderBase } from 'src/modules/common/helpers/data.loader.base';
import { IDataLoaderCreate } from 'src/modules/common/interfaces/data-loader-create.interface';
import { IDataLoaderBase } from 'src/modules/common/interfaces/data.loader.interface';
import { User } from '../entities/user.entity';
import { GetUserService } from '../services/get.user.service';

@Injectable()
export class UserLoader extends DataLoaderBase<number, User> implements IDataLoaderBase<number, User> {
    constructor(private readonly getUserService: GetUserService) {
        super();
    }

    create(): IDataLoaderCreate<number, User> {
        return {
            batchLoadFn: async keys => {
                const users = await this.getUserService.execute([...keys]);

                return this.remap([...keys], users);
            },
        };
    }
}
