import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { OptionGroup } from '../../../product-association/option-group/entities/option.group.entity';
import { DataLoaderBase } from '../../../common/helpers/data.loader.base';
import { IDataLoaderBase } from '../../../common/interfaces/data.loader.interface';
import { ListOptionGroupService } from '../../../product-association/option-group/services/list-options-groups.service';

@Injectable()
export class OrderOptionGroupRelatedLoader extends DataLoaderBase<number, OptionGroup>
    implements IDataLoaderBase<number, OptionGroup> {
    constructor(private readonly listOptionsGroupsService: ListOptionGroupService) {
        super();
    }

    create() {
        return new DataLoader<number, OptionGroup>(async keys => {
            const allProducts = await this.listOptionsGroupsService.execute({
                optionGroupId: [...keys],
                includeRemoved: true,
                onlyActive: false,
            });

            return this.remap([...keys], allProducts);
        });
    }
}
