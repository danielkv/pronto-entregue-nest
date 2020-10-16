import { Injectable } from '@nestjs/common';
import { DataLoaderBase } from '../../../common/helpers/data.loader.base';
import { ListOptionService } from '../../../product-association/option/services/list-options.service';
import { Option } from '../../../product-association/option/entities/option.entity';
import { IDataLoaderCreate } from '../../../common/interfaces/data-loader-create.interface';
import { IDataLoaderBase } from '../../../common/interfaces/data.loader.interface';

@Injectable()
export class OrderOptionRelatedLoader extends DataLoaderBase<number, Option>
    implements IDataLoaderBase<number, Option> {
    constructor(private readonly listOptionService: ListOptionService) {
        super();
    }

    create(): IDataLoaderCreate<number, Option> {
        return {
            batchLoadFn: async keys => {
                const allOptions = await this.listOptionService.execute({
                    optionId: [...keys],
                    includeRemoved: true,
                    onlyActive: false,
                });

                return this.remap([...keys], allOptions);
            },
        };
    }
}
