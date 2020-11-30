import { RepositoryBase } from 'src/modules/common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { OptionGroup } from '../entities/option.group.entity';

@EntityRepository(OptionGroup)
export class OptionGroupRepository extends RepositoryBase<OptionGroup> {}
