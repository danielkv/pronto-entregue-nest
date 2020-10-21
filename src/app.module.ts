import { Module } from '@nestjs/common';
import { AddressModule } from './modules/address/address.module';
import { CategoryModule } from './modules/category/category.module';
import { ConfigModule } from './modules/config/config.module';
import { CouponModule } from './modules/coupon/coupon.module';
import { DeliveryModule } from './modules/delivery/delivery.module';
import { ProductModule } from './modules/product-association/product/product.module';
import { UserModule } from './modules/user-association/user/user.module';
import { PaymentModule } from './modules/payment/payment.module';
import { RatingModule } from './modules/rating/rating.module';
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { GraphqlModule } from './modules/graphql/graphql.module';
import { CommonModule } from './modules/common/common.module';
import { PickupModule } from './modules/pickup/pickup.module';
import { DeliveryAreaModule } from './modules/delivery-area/delivery-area.module';
import { OrderAssociationModule } from './modules/order-association/order-association.module';
import { CompanyAssociationModule } from './modules/company-association/company-association.module';
import { CreditAssociationModule } from './modules/credit-association/credit-association.module';
import { ProductAssociationModule } from './modules/product-association/product-association.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserAssociationModule } from './modules/user-association/user-association.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        CompanyAssociationModule,
        AddressModule,
        CategoryModule,
        ConfigModule,
        CouponModule,
        DeliveryModule,
        ProductModule,
        UserModule,
        PaymentModule,
        RatingModule,
        GraphqlModule,
        CommonModule,
        PickupModule,
        DeliveryAreaModule,
        OrderAssociationModule,
        CompanyAssociationModule,
        CreditAssociationModule,
        ProductAssociationModule,
        AuthModule,
        UserAssociationModule,
    ],
    providers: [],
})
export class AppModule {
    constructor(private connection: Connection) {}
}
