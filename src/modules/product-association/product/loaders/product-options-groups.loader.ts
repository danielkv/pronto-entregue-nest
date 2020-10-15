import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { DataLoaderBase } from '../../../common/helpers/data.loader.base';
import { IDataLoaderBase } from '../../../common/helpers/data.loader.interface';
import { OptionGroup } from '../../option-group/entities/option.group.entity';
import { ListOptionGroupService } from '../../option-group/services/list-options-groups.service';

@Injectable()
export class ProductOptionsGroupsLoader extends DataLoaderBase<number, OptionGroup[]>
    implements IDataLoaderBase<number, OptionGroup[]> {
    constructor(private readonly listOptionsGroupsService: ListOptionGroupService) {
        super();
    }

    create() {
        return new DataLoader<number, OptionGroup[]>(async keys => {
            const allGroups = await this.listOptionsGroupsService.execute({ productId: [...keys] });

            return keys.map(key => allGroups.filter(group => group.productId === key));
        });
    }
}
