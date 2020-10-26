import { Category } from '../entities/category.entity';

export interface ICreateCategoryEvent {
    category: Category;
}
