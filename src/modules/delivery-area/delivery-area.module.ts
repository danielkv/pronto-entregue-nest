import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetDeliveryAreaService } from './services/get-delivery-area.service';
import { DeliveryAreaFilter } from './dtos/delivery.area.filter';
import { ListDeliveryAreasService } from './services/list-delivery-areas.service';
import { DeliveryAreaResolver } from './resolvers/delivery-area.resolver';
import { CountDeliveryAreasService } from './services/count-delivery-areas.service';
import { DeliveryAreaRepository } from './repositories/delivery.area.repository';

@Module({
    imports: [TypeOrmModule.forFeature([DeliveryAreaRepository]), DeliveryAreaFilter],
    providers: [
        GetDeliveryAreaService,
        ListDeliveryAreasService,
        CountDeliveryAreasService,

        DeliveryAreaResolver,
    ],
})
export class DeliveryAreaModule {}
