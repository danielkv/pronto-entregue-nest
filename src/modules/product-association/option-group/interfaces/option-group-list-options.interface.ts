import { IRepositoryListOptions } from 'src/modules/common/interfaces/IRepositoryListOptions';
import { OptionGroupFilterDTO } from '../dtos/option-group.filter.dto';
import { OptionGroup } from '../entities/option.group.entity';

export interface IOptionGroupListOptions extends IRepositoryListOptions<OptionGroup, OptionGroupFilterDTO> {}
