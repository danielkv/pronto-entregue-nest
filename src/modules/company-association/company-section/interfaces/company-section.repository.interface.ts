import { IRepositoryBase } from 'src/modules/common/interfaces/repository.base.interface';
import { CompanySection } from '../../company/entities/company.type.entity';
import { CompanySectionFilterDTO } from '../dtos/compaany-section.filter.dto';

export interface ICompanySectionRepository
    extends IRepositoryBase<CompanySection, CompanySectionFilterDTO> {}
