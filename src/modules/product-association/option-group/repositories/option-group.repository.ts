import { RepositoryProviderFactory } from 'src/modules/common/helpers/repository-provider.factory';
import { RepositoryBase } from 'src/modules/common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { OptionGroupFilterDTO } from '../dtos/option-group.filter.dto';
import { OptionGroup } from '../entities/option.group.entity';
import { IOptionGroupRepository } from '../interface/option-grou.repository.interface';

@EntityRepository(OptionGroup)
export class OptionGroupRepository extends RepositoryBase<OptionGroup, OptionGroupFilterDTO>
    implements IOptionGroupRepository {
    constructor() {
        super();

        this.setQueryBuilderTableName('optionGroup');
    }
}

export const OptionGroupRepositoryProvider = new RepositoryProviderFactory(
    'IOptionGroupRepository',
    OptionGroupRepository,
).create();
