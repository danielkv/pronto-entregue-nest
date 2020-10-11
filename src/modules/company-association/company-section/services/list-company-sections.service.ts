import { Inject, Injectable } from '@nestjs/common';
import { PageInfo } from 'src/modules/common/types/page-info';
import { CompanySectionFilterDTO } from '../dtos/compaany-section.filter.dto';
import { CompanySection } from '../entities/company.type.entity';
import { ICompanySectionRepository } from '../interfaces/company-section.repository.interface';

@Injectable()
export class ListCompanySectionsService {
    constructor(@Inject('ICompanySectionRepository') private companySectionRepository: ICompanySectionRepository) {}

    execute(filter?: CompanySectionFilterDTO, pagination?: PageInfo): Promise<CompanySection[]> {
        return this.companySectionRepository.getList(filter, pagination);
    }
}
