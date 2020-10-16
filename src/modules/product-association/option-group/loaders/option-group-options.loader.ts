import { Injectable } from '@nestjs/common';
import { IDataLoaderCreate } from 'src/modules/common/interfaces/data-loader-create.interface';
import { DataLoaderBase } from '../../../common/helpers/data.loader.base';
import { IDataLoaderBase } from '../../../common/interfaces/data.loader.interface';
import { Option } from '../../option/entities/option.entity';
import { ListOptionService } from '../../option/services/list-options.service';

@Injectable()
export class OptionGroupOptionsLoader extends DataLoaderBase<number, Option[]>
    implements IDataLoaderBase<number, Option[]> {
    constructor(private readonly listOptionService: ListOptionService) {
        super();
    }

    create(): IDataLoaderCreate<number, Option[]> {
        return {
            batchLoadFn: async keys => {
                const allGroups = await this.listOptionService.execute({ optionsGroupId: [...keys] });

                return keys.map(key => allGroups.filter(group => group.optionsGroupId === key));
            },
        };
    }
}
