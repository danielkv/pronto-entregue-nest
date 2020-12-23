import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { CouponDTO } from './dto/coupon.dto';
import { Coupon } from './entities/coupon.entity';
import { ValidateSaveCouponHelper } from './helpers/validate-create-coupon.helper';
import { ValidateUseCouponHelper } from './helpers/validate-use-coupon.helper';

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([Coupon])],
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
        ValidateSaveCouponHelper,
        ValidateUseCouponHelper,
    ],
    exports: [ValidateUseCouponHelper],
})
export class CouponModule {}
