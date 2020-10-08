import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryFilterDTO } from './dtos/category.filter.dto';
import { CategoryRepository } from './repositories/category.repository';

@Module({ imports: [TypeOrmModule.forFeature([CategoryRepository]), CategoryFilterDTO] })
export class CategoryModule {}
