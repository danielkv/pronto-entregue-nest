import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { SaleDTO } from './dtos/sale.dto';
import { Sale } from './entities/sale.entity';

const saleTypeOrmModule = NestjsQueryTypeOrmModule.forFeature([Sale]);

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [saleTypeOrmModule],
            resolvers: [
                {
                    DTOClass: SaleDTO,
                    EntityClass: Sale,
                },
            ],
        }),

        saleTypeOrmModule,
    ],
    exports: [saleTypeOrmModule],
})
export class SaleModule {}
