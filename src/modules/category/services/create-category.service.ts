import { Inject, Injectable } from '@nestjs/common';
import { NestEventEmitter } from 'nest-event';
import { IMainEvents } from 'src/main-event-emitter/main-events.interface';
import { ICategoryRepository } from '../interfaces/category.repository.interface';
import { ICreateCategoryEvent } from '../interfaces/create-category-event.interface';
import { CategoryDTO } from '../dtos/category.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CreateCategoryService {
    constructor(
        @Inject('ICategoryRepository') private categoryRepository: ICategoryRepository,
        private eventEmitter: NestEventEmitter,
    ) {}

    async execute(category: CategoryDTO): Promise<Category> {
        // create instance
        const categoryInstance = this.categoryRepository.create(category);

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
