import { Module } from '@nestjs/common';
import { CategoryFilterDTO } from './dtos/category.filter.dto';
import { CategoryRepositoryProvider } from './repositories/category.repository';

@Module({ imports: [CategoryFilterDTO], providers: [CategoryRepositoryProvider] })
export class CategoryModule {}
