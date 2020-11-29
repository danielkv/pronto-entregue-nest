import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { CategoryDTO } from './dtos/category.dto';
import { CategoryRepository } from './repositories/category.repository';

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([CategoryRepository])],
            resolvers: [{ DTOClass: CategoryDTO, EntityClass: CategoryRepository }],
        }),
    ],
})
export class CategoryModule {}
