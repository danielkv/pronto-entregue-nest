import { Module } from '@nestjs/common';
import { ProductRepository } from './repositories/product.repository';
import { ProductDTO } from './dtos/product.dto';
import { SortDirection } from '@nestjs-query/core';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([ProductRepository])],
            resolvers: [
                {
                    DTOClass: ProductDTO,
                    EntityClass: ProductRepository,
                    delete: { disabled: true },
                    read: {
                        defaultSort: [{ field: 'order', direction: SortDirection.DESC }],
                        defaultFilter: { active: { is: true } },
                    },
                },
            ],
        }),
    ],
})
export class ProductModule {}
