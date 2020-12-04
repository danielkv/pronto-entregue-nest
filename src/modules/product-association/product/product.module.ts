import { Module } from '@nestjs/common';
import { ProductDTO } from './dtos/product.dto';
import { SortDirection } from '@nestjs-query/core';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Product } from './entities/product.entity';
import { ProductInputDTO } from './dtos/product-input.dto';

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([Product])],
            resolvers: [
                {
                    DTOClass: ProductDTO,
                    CreateDTOClass: ProductInputDTO,
                    UpdateDTOClass: ProductInputDTO,
                    EntityClass: Product,
                    delete: { disabled: true },
                    read: {
                        defaultSort: [{ field: 'order', direction: SortDirection.DESC }],
                        defaultFilter: { active: { is: true } },
                    },
                    create: { many: { disabled: true } },
                },
            ],
        }),
    ],
})
export class ProductModule {}
