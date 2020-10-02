import { Module } from '@nestjs/common';
import { CompanyModule } from './modules/company/company.module';
import { AddressModule } from './modules/address/address.module';
import { CategoryModule } from './modules/category/category.module';
import { ConfigModule } from './modules/config/config.module';
import { CouponModule } from './modules/coupon/coupon.module';
import { CreditModule } from './modules/credit/credit.module';
import { DeliveryModule } from './modules/delivery/delivery.module';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';
import { UserModule } from './modules/user/user.module';
import { PaymentModule } from './modules/payment/payment.module';
import { RatingModule } from './modules/rating/rating.module';
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { GraphqlModule } from './modules/graphql/graphql.module';
import { CommonModule } from './modules/common/common.module';
import { PickupModule } from './modules/pickup/pickup.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        CompanyModule,
        AddressModule,
        CategoryModule,
        ConfigModule,
        CouponModule,
        CreditModule,
        DeliveryModule,
        ProductModule,
        OrderModule,
        UserModule,
        PaymentModule,
        RatingModule,
        GraphqlModule,
        CommonModule,
        PickupModule,
    ],
    providers: [],
})
export class AppModule {
    constructor(private connection: Connection) {}
}
