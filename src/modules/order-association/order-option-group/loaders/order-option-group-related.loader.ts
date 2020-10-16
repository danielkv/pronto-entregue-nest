import { Injectable } from '@nestjs/common';
import { OptionGroup } from '../../../product-association/option-group/entities/option.group.entity';
import { DataLoaderBase } from '../../../common/helpers/data.loader.base';
import { ListOptionGroupService } from '../../../product-association/option-group/services/list-options-groups.service';
import { IDataLoaderCreate } from '../../../common/interfaces/data-loader-create.interface';
import { IDataLoaderBase } from '../../../common/interfaces/data.loader.interface';

@Injectable()
export class OrderOptionGroupRelatedLoader extends DataLoaderBase<number, OptionGroup>
    implements IDataLoaderBase<number, OptionGroup> {
    constructor(private readonly listOptionsGroupsService: ListOptionGroupService) {
        super();
    }

    create(): IDataLoaderCreate<number, OptionGroup> {
        return {
            batchLoadFn: async keys => {
                const allProducts = await this.listOptionsGroupsService.execute({
                    optionGroupId: [...keys],
                    includeRemoved: true,
                    onlyActive: false,
                });

                return this.remap([...keys], allProducts);
            },
        };
    }
}
