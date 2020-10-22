import { Injectable } from '@nestjs/common';
import { IDataLoaderCreate } from 'src/modules/common/interfaces/data-loader-create.interface';
import { DataLoaderBase } from '../../../common/helpers/data.loader.base';
import { IDataLoaderBase } from '../../../common/interfaces/data.loader.interface';
import { UserMeta } from '../../user-meta/entities/user.meta.entity';
import { ListUserMetasService } from '../../user-meta/services/list-user-metas.service';

@Injectable()
export class UserMetasLoader extends DataLoaderBase<number, UserMeta[]> implements IDataLoaderBase<number, UserMeta[]> {
    constructor(private readonly listUserMetasService: ListUserMetasService) {
        super();
    }

    create(): IDataLoaderCreate<number, UserMeta[]> {
        return {
            batchLoadFn: async keys => {
                const allMetas = await this.listUserMetasService.execute({ userId: [...keys] });

                return keys.map(key => allMetas.filter(meta => meta.userId === key));
            },
        };
    }
}
