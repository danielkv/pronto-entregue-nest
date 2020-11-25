import { Module } from '@nestjs/common';
import { DeliveryRepositoryProvider } from './repositories/delivery.repository';
import { SetDeliveryManService } from './services/set-delivery-man.service';
import { ChangeDeliveryStatusService } from './services/change-delivery-status.service';

@Module({
    providers: [
        // services
        SetDeliveryManService,
        ChangeDeliveryStatusService,

        // respositories
        DeliveryRepositoryProvider,
    ],
})
export class DeliveryModule {}
