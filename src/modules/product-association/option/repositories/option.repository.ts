import { RepositoryProviderFactory } from 'src/modules/common/helpers/repository-provider.factory';
import { RepositoryBase } from 'src/modules/common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { OptionFilterDTO } from '../dtos/option.filter.dto';
import { Option } from '../entities/option.entity';
import { IOptionRepository } from '../interface/option.repository.interface';

@EntityRepository(Option)
export class OptionRepository extends RepositoryBase<Option, OptionFilterDTO> implements IOptionRepository {
    constructor() {
        super();

        this.setQueryBuilderTableName('option');
    }
}

export const OptionRepositoryProvider = new RepositoryProviderFactory('IOptionRepository', OptionRepository).create();
