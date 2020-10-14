import { IRepositoryListOptions } from 'src/modules/common/interfaces/IRepositoryListOptions';
import { OptionFilterDTO } from '../dtos/option.filter.dto';
import { Option } from '../entities/option.entity';

export interface IOptionListOptions extends IRepositoryListOptions<Option, OptionFilterDTO> {}
