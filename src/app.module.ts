import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AddressModule } from './modules/address/address.module';
import { CategoryModule } from './modules/category/category.module';
import { ConfigModule } from './modules/config/config.module';
import { CouponModule } from './modules/coupon/coupon.module';
import { DeliveryModule } from './modules/delivery/delivery.module';
import { PaymentModule } from './modules/payment/payment.module';
import { RatingModule } from './modules/rating/rating.module';
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
import { UserAssociationModule } from './modules/user-association/user-association.module';
import { NotificationAssociationModule } from './modules/notification-association/notification-association.module';
import { NestEventModule } from 'nest-event';
import { AuthModule } from './modules/auth/auth.module';
import { InjectQueue } from '@nestjs/bull';
import { setQueues, UI } from 'bull-board';
import { Queue } from 'bull';
import { DeliverManModule } from './modules/deliver-man/deliver-man.module';
import { MailModule } from './modules/mail/mail.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        CompanyAssociationModule,
        AddressModule,
        NestEventModule,
        GraphqlModule,
        CategoryModule,
        ConfigModule,
        CouponModule,
        DeliveryModule,

        PaymentModule,
        RatingModule,

        CommonModule,
        PickupModule,
        DeliveryAreaModule,
        OrderAssociationModule,
        CreditAssociationModule,
        ProductAssociationModule,
        AuthModule,
        UserAssociationModule,

        NotificationAssociationModule,

        DeliverManModule,

        MailModule,

        ScheduleModule.forRoot(),
    ],
    providers: [],
})
export class AppModule {
    constructor(
        @InjectQueue('notification') private notificationQueue: Queue,
        @InjectQueue('mail') private mailQueue: Queue,
    ) {
        setQueues([this.notificationQueue, this.mailQueue]);
    }

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UI).forRoutes('bull');
    }
}
