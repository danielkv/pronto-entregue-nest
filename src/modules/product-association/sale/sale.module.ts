import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { CouponDTO } from 'src/modules/coupon/dto/coupon.dto';
import { Coupon } from 'src/modules/coupon/entities/coupon.entity';

const saleTypeOrmModule = NestjsQueryTypeOrmModule.forFeature([Coupon]);

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [saleTypeOrmModule],
            resolvers: [
                {
                    DTOClass: CouponDTO,
                    EntityClass: Coupon,
                },
            ],
        }),

        saleTypeOrmModule,
    ],
    exports: [saleTypeOrmModule],
})
export class SaleModule {}
