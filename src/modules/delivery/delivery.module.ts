import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryArea } from './entities/delivery.area.entity';
import { Delivery } from './entities/delivery.entity';
import { GetDeliveryAreaService } from './get-delivery-area/get-delivery-area.service';

@Module({
    imports: [TypeOrmModule.forFeature([Delivery, DeliveryArea])],
    providers: [GetDeliveryAreaService],
})
export class DeliveryModule {}
