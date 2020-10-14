import { IRepositoryBase } from 'src/modules/common/interfaces/repository.base.interface';
import { OptionFilterDTO } from '../dtos/option.filter.dto';
import { Option } from '../entities/option.entity';

export interface IOptionRepository extends IRepositoryBase<Option, OptionFilterDTO> {}
