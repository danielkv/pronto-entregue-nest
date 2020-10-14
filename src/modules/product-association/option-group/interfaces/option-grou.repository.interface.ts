import { IRepositoryBase } from 'src/modules/common/interfaces/repository.base.interface';
import { OptionGroupFilterDTO } from '../dtos/option-group.filter.dto';
import { OptionGroup } from '../entities/option.group.entity';

export interface IOptionGroupRepository extends IRepositoryBase<OptionGroup, OptionGroupFilterDTO> {}
