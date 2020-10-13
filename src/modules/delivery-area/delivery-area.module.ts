import { Module } from '@nestjs/common';
import { GetDeliveryAreaService } from './services/get-delivery-area.service';
import { DeliveryAreaFilterDTO } from './dtos/delivery.area.filter.dto';
import { ListDeliveryAreasService } from './services/list-delivery-areas.service';
import { DeliveryAreaResolver } from './resolvers/delivery-area.resolver';
import { CountDeliveryAreasService } from './services/count-delivery-areas.service';
import { DeliveryAreaRepositoryProvider } from './repositories/delivery.area.repository';
import { CompanyDeliveryAreaResolver } from './resolvers/company-delivery.resolver';
import { DeliveryAreaActiveFilter } from './filters/delivery.area.active.filter';
import { DeliveryAreaCompaniesFilter } from './filters/delivery.area.companies.filter';
import { DeliveryAreaLocationFilter } from './filters/delivery.area.location.filter';
import { DeliveryAreaListDTO } from './dtos/delivery-area.list.dto';

@Module({
    imports: [DeliveryAreaListDTO, DeliveryAreaFilterDTO],
    providers: [
        // resolvers
        DeliveryAreaResolver,
        CompanyDeliveryAreaResolver,

        // filters
        DeliveryAreaActiveFilter,
        DeliveryAreaCompaniesFilter,
        DeliveryAreaLocationFilter,

        // services
        GetDeliveryAreaService,
        ListDeliveryAreasService,
        CountDeliveryAreasService,

        // repositories
        DeliveryAreaRepositoryProvider,
    ],
})
export class DeliveryAreaModule {}
