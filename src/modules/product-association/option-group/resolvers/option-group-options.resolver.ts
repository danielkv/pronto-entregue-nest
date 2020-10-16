import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { OptionGroup } from '../../option-group/entities/option.group.entity';
import { Option } from '../../option/entities/option.entity';
import { OptionGroupOptionsLoader } from '../loaders/option-group-options.loader';

@Resolver(() => OptionGroup)
export class OptionGroupOptionsResolver {
    constructor(private optionGroupOptionsLoader: OptionGroupOptionsLoader) {}

    @ResolveField(() => [Option], { nullable: 'items' })
    options(@Parent() orderProduct: OptionGroup): Promise<Option[]> {
        const optionGroupId = orderProduct.id;

        return this.optionGroupOptionsLoader.loader.load(optionGroupId);
    }
}
