import { RepositoryBase } from 'src/modules/common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { Option } from '../entities/option.entity';

@EntityRepository(Option)
export class OptionRepository extends RepositoryBase<Option> {}
