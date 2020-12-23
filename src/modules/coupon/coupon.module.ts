import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { Order } from '../order-association/order/entities/order.entity';
import { SaleModule } from '../product-association/sale/sale.module';
import { CouponDTO } from './dto/coupon.dto';
import { Coupon } from './entities/coupon.entity';

import { ValidateUseCouponHelper } from './helpers/validate-use-coupon.helper';

const couponTypeOrmModule = NestjsQueryTypeOrmModule.forFeature([Coupon]);

const orderTypeOrmModule = NestjsQueryTypeOrmModule.forFeature([Order]);

@Module({
    imports: [
        SaleModule,
        orderTypeOrmModule,
        couponTypeOrmModule,

        NestjsQueryGraphQLModule.forFeature({
            imports: [couponTypeOrmModule],
            resolvers: [
                {
                    DTOClass: CouponDTO,
                    EntityClass: Coupon,
                    create: { many: { disabled: true } },
                },
            ],
        }),
    ],
    providers: [
        // helpers
        ValidateUseCouponHelper,
    ],
    exports: [ValidateUseCouponHelper],
})
export class CouponModule {}
