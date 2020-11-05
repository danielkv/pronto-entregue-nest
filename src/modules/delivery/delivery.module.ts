import { Module } from '@nestjs/common';
import { DeliverySearchFilter } from './filters/delivery.search.filter';
import { DeliveryRepositoryProvider } from './repositories/delivery.repository';
import { CreateDeliveryService } from './services/create-delivery.service';
import { ListDeliveriesService } from './services/list-deliveries.service';
import { CountDeliveriesService } from './services/count-deliveries.service';
import { SetDeliveryManService } from './services/set-delivery-man.service';
import { UpdateDeliveryService } from './services/update-delivery.service';
import { ChangeDeliveryStatusService } from './services/change-delivery-status.service';

@Module({
    providers: [
        // services
        SetDeliveryManService,
        CreateDeliveryService,
        UpdateDeliveryService,
        ChangeDeliveryStatusService,
        ListDeliveriesService,
        CountDeliveriesService,

        // filters
        DeliverySearchFilter,

        // respositories
        DeliveryRepositoryProvider,
    ],
})
export class DeliveryModule {}
