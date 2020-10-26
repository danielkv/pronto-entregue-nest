import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NestEventEmitter } from 'nest-event';
import { IMainEvents } from 'src/main-event-emitter/main-events.interface';
import { CategoryDTO } from 'src/modules/category/dtos/category.dto';
import { Category } from 'src/modules/category/entities/category.entity';
import { ICategoryRepository } from 'src/modules/category/interfaces/category.repository.interface';
import { CategoryRepository } from 'src/modules/category/repositories/category.repository';
import { CreateCategoryService } from 'src/modules/category/services/create-category.service';
import { TransactionHelper } from 'src/modules/common/helpers/transactionHelper';
import { Company } from '../entities/company.entity';
import { ICompanyRepository } from '../interfaces/company.repository.interface';
import { ICreateCompanyCategoryEvent } from '../interfaces/create-company-category-event.interface';

@Injectable()
export class AddUserAddressService {
    constructor(
        @Inject('ICompanyRepository') private companyRepository: ICompanyRepository,
        private transactionHelper: TransactionHelper,
        private readonly eventEmitter: NestEventEmitter,
    ) {}

    async execute(companyId: Company['id'], category: CategoryDTO): Promise<Category> {
        // check if company exists
        const company = await this.companyRepository.get(companyId);
        if (!company) throw new NotFoundException('Esse usuário não existe');

        // start transaction
        const created = await this.transactionHelper.execute<Category>(async manager => {
            // create category
            const categoryRepository: ICategoryRepository = manager.getCustomRepository(CategoryRepository);
            const createCategoryService = new CreateCategoryService(categoryRepository, this.eventEmitter);
            const newCategory = await createCategoryService.execute(category);

            // assign category to company
            await this.companyRepository.addCategory(companyId, newCategory.id);

            return newCategory;
        });

        // events
        const event: ICreateCompanyCategoryEvent = {
            company,
            category: created,
        };
        this.eventEmitter.strictEmitter<IMainEvents>().emit('createCompanyCategory', event);

        // return category
        return created;
    }
}
