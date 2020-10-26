import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NestEventEmitter } from 'nest-event';
import { IMainEvents } from 'src/main-event-emitter/main-events.interface';
import { ICategoryRepository } from '../interfaces/category.repository.interface';
import { CategoryDTO } from '../dtos/category.dto';
import { Category } from '../entities/category.entity';
import { IUpdateCategoryEvent } from '../interfaces/update-category-event.interface';

@Injectable()
export class UpdateCategoryService {
    constructor(
        @Inject('ICategoryRepository') private categoryRepository: ICategoryRepository,
        private eventEmitter: NestEventEmitter,
    ) {}

    async execute(categoryId: Category['id'], category: CategoryDTO): Promise<Category> {
        // check if category exists
        const oldCategory = await this.categoryRepository.get(categoryId);
        if (!oldCategory) throw new NotFoundException('A Categoria não existe');

        // create instance
        const categoryMerged = this.categoryRepository.merge(oldCategory, category);

        // save instance
        const updated = await this.categoryRepository.save(categoryMerged);

        // events
        const event: IUpdateCategoryEvent = {
            category: updated,
        };
        this.eventEmitter.strictEmitter<IMainEvents>().emit('updateCategory', event);

        // return address
        return updated;
    }
}
