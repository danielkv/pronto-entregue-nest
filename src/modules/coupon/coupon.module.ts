import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { CouponDTO } from './dto/coupon.dto';
import { CouponRepository } from './repositories/coupon.repository';

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([CouponRepository])],
            resolvers: [{ DTOClass: CouponDTO, EntityClass: CouponRepository }],
        }),
    ],
})
export class CouponModule {}
