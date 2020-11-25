import { Module } from '@nestjs/common';
import { CategoryRepositoryProvider } from './repositories/category.repository';

@Module({
    providers: [
        //repositories
        CategoryRepositoryProvider,
    ],
})
export class CategoryModule {}
