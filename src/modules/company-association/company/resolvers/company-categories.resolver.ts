import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Category } from 'src/modules/category/entities/category.entity';
import { Company } from '../entities/company.entity';
import { CompanyCategoriesLoader } from '../loaders/company-categories.loader';

@Resolver(() => Company)
export class CompanyCategoriesResolver {
    constructor(private companyCategoriesLoader: CompanyCategoriesLoader) {}

    @ResolveField(() => [Category], { nullable: 'items' })
    categories(@Parent() company: Company): Promise<Category[]> {
        const companyId = company.id;

        return this.companyCategoriesLoader.loader.load(companyId);
    }
}
