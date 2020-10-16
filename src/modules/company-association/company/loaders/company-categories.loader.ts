import { Injectable } from '@nestjs/common';
import { Category } from 'src/modules/category/entities/category.entity';
import { ListCategoriesService } from 'src/modules/category/services/list-categories.service';
import { DataLoaderBase } from 'src/modules/common/helpers/data.loader.base';
import { IDataLoaderCreate } from 'src/modules/common/interfaces/data-loader-create.interface';
import { IDataLoaderBase } from 'src/modules/common/interfaces/data.loader.interface';

@Injectable()
export class CompanyCategoriesLoader extends DataLoaderBase<number, Category[]>
    implements IDataLoaderBase<number, Category[]> {
    constructor(private listCategoriesService: ListCategoriesService) {
        super();
    }

    create(): IDataLoaderCreate<number, Category[]> {
        return {
            batchLoadFn: async keys => {
                const allCategories = await this.listCategoriesService.execute({ companyId: [...keys] });

                return keys.map(key => {
                    return allCategories.filter(category => category.companyId === key);
                });
            },
        };
    }
}
