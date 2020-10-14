import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { DataLoaderBase } from '../../../common/helpers/data.loader.base';
import { IDataLoaderBase } from '../../../common/helpers/data.loader.interface';
import { ListOptionService } from '../../../product-association/option/services/list-options.service';
import { Option } from '../../../product-association/option/entities/option.entity';

@Injectable()
export class OrderOptionRelatedLoader extends DataLoaderBase<number, Option>
    implements IDataLoaderBase<number, Option> {
    constructor(private readonly listOptionService: ListOptionService) {
        super();
    }

    create() {
        return new DataLoader<number, Option>(async keys => {
            const allOptions = await this.listOptionService.execute({
                optionId: [...keys],
                includeRemoved: true,
                onlyActive: false,
            });

            return this.remap([...keys], allOptions);
        });
    }
}
