import { Injectable } from '@nestjs/common';
import { IDataLoaderCreate } from '../../../common/interfaces/data-loader-create.interface';
import { IDataLoaderBase } from '../../../common/interfaces/data.loader.interface';
import { DataLoaderBase } from '../../../common/helpers/data.loader.base';
import { OptionGroup } from '../../option-group/entities/option.group.entity';
import { ListOptionGroupService } from '../../option-group/services/list-options-groups.service';

@Injectable()
export class ProductOptionsGroupsLoader extends DataLoaderBase<number, OptionGroup[]>
    implements IDataLoaderBase<number, OptionGroup[]> {
    constructor(private readonly listOptionsGroupsService: ListOptionGroupService) {
        super();
    }

    create(): IDataLoaderCreate<number, OptionGroup[]> {
        return {
            batchLoadFn: async keys => {
                const allGroups = await this.listOptionsGroupsService.execute({ productId: [...keys] });

                return keys.map(key => allGroups.filter(group => group.productId === key));
            },
        };
    }
}
