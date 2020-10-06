import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryArea } from './entities/delivery.area.entity';
import { DeliveryAreaFilterHelper } from './helpers/delivery.area.filter.helper';
import { DeliveryAreaFilterCompanies } from './helpers/delivery.filter.companies';
import { DeliveryAreaFilterLocation } from './helpers/delivery.filter.location';
import { GetDeliveryAreaService } from './services/get-delivery-area.service';
import { DeliveryAreaFilter } from './types/delivery.area.filter';
import { ListDeliveryAreasService } from './services/list-delivery-areas.service';
import { DeliveryAreaResolver } from './resolvers/delivery-area.resolver';
import { CountDeliveryAreasService } from './services/count-delivery-areas.service';

@Module({
    imports: [TypeOrmModule.forFeature([DeliveryArea]), DeliveryAreaFilter],
    providers: [
        GetDeliveryAreaService,
        DeliveryAreaFilterHelper,
        DeliveryAreaFilterLocation,
        DeliveryAreaFilterCompanies,
        ListDeliveryAreasService,
        CountDeliveryAreasService,
        DeliveryAreaResolver,
    ],
})
export class DeliveryAreaModule {}
