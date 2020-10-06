import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryArea } from './entities/delivery.area.entity';
import { DeliveryAreaFilterHelper } from './helpers/delivery.area.filter.helper';
import { DeliveryAreaCompaniesFilter } from './filters/delivery.area.companies.filter';
import { DeliveryAreaLocationFilter } from './filters/delivery.area.location.filter';
import { GetDeliveryAreaService } from './services/get-delivery-area.service';
import { DeliveryAreaFilter } from './types/delivery.area.filter';
import { ListDeliveryAreasService } from './services/list-delivery-areas.service';
import { DeliveryAreaResolver } from './resolvers/delivery-area.resolver';
import { CountDeliveryAreasService } from './services/count-delivery-areas.service';
import { DeliveryAreaActiveFilter } from './filters/delivery.area.active.filter';

@Module({
    imports: [TypeOrmModule.forFeature([DeliveryArea]), DeliveryAreaFilter],
    providers: [
        DeliveryAreaFilterHelper,
        DeliveryAreaLocationFilter,
        DeliveryAreaCompaniesFilter,
        DeliveryAreaActiveFilter,

        GetDeliveryAreaService,
        ListDeliveryAreasService,
        CountDeliveryAreasService,

        DeliveryAreaResolver,
    ],
})
export class DeliveryAreaModule {}
