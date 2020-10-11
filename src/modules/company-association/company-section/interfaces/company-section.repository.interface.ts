import { IRepositoryBase } from '../../../common/interfaces/repository.base.interface';
import { CompanySection } from '../entities/company.type.entity';
import { CompanySectionFilterDTO } from '../dtos/compaany-section.filter.dto';

export interface ICompanySectionRepository extends IRepositoryBase<CompanySection, CompanySectionFilterDTO> {}
