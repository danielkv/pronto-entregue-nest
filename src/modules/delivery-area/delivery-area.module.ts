import { Module } from '@nestjs/common';
import { GetDeliveryAreaService } from './services/get-delivery-area.service';
import { DeliveryAreaFilterDTO } from './dtos/delivery.area.filter.dto';
import { ListDeliveryAreasService } from './services/list-delivery-areas.service';
import { DeliveryAreaResolver } from './resolvers/delivery-area.resolver';
import { CountDeliveryAreasService } from './services/count-delivery-areas.service';
import { DeliveryAreaRepositoryProvider } from './repositories/delivery.area.repository';

@Module({
    imports: [DeliveryAreaFilterDTO],
    providers: [
        // resolvers
        DeliveryAreaResolver,

        // services
        GetDeliveryAreaService,
        ListDeliveryAreasService,
        CountDeliveryAreasService,

        // repositories
        DeliveryAreaRepositoryProvider,
    ],
})
export class DeliveryAreaModule {}
