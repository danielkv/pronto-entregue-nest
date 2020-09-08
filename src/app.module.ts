import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './modules/company/company.module';
import { DatabaseModule } from './modules/database/database.module';
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
import { AreaModule } from './modules/area/area.module';

@Module({
	imports: [DatabaseModule, CompanyModule, AddressModule, CategoryModule, ConfigModule, CouponModule, CreditModule, DeliveryModule, ProductModule, OrderModule, UserModule, PaymentModule, RatingModule, AreaModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
