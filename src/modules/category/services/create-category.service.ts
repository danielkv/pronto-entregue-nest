import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NestEventEmitter } from 'nest-event';
import { IMainEvents } from 'src/main-event-emitter/main-events.interface';
import { ICategoryRepository } from '../interfaces/category.repository.interface';
import { ICreateCategoryEvent } from '../interfaces/create-category-event.interface';
import { CategoryDTO } from '../dtos/category.dto';
import { Category } from '../entities/category.entity';
import { Company } from 'src/modules/company-association/company/entities/company.entity';
import { ICompanyRepository } from 'src/modules/company-association/company/interfaces/company.repository.interface';

@Injectable()
export class CreateCategoryService {
    constructor(
        @Inject('ICategoryRepository') private categoryRepository: ICategoryRepository,
        @Inject('ICompanyRepository') private companyRepository: ICompanyRepository,
        private eventEmitter: NestEventEmitter,
    ) {}

    async execute(companyId: Company['id'], category: CategoryDTO): Promise<Category> {
        // check if company exists
        const company = await this.companyRepository.get(companyId);
        if (!company) throw new NotFoundException('Empresa não existe');

        // create instance
        const categoryInstance = this.categoryRepository.create({ ...category, companyId });

        // save instance
        const created = await this.categoryRepository.save(categoryInstance);

        // events
        const event: ICreateCategoryEvent = {
            category: created,
        };
        this.eventEmitter.strictEmitter<IMainEvents>().emit('createCategory', event);

        // return address
        return created;
    }
}
