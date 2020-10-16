import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { DataLoaderBase } from 'src/modules/common/helpers/data.loader.base';
import { IDataLoaderBase } from 'src/modules/common/interfaces/data.loader.interface';
import { CompanySection } from '../entities/company.type.entity';
import { ListCompanySectionsService } from '../services/list-company-sections.service';

@Injectable()
export class CompanySectionLoader extends DataLoaderBase<number, CompanySection[]>
    implements IDataLoaderBase<number, CompanySection[]> {
    constructor(private readonly listCompanySectionsService: ListCompanySectionsService) {
        super();
    }

    create() {
        return new DataLoader<number, CompanySection[]>(async keys => {
            const allSections = await this.listCompanySectionsService.execute({ companyId: [...keys] });

            return keys.map(key => {
                return allSections.filter(section => section.companies.filter(company => company.id === key).length);
            });
        });
    }
}
