import { Module } from '@nestjs/common';
import { PickUpAreaRepositoryProvider } from './repositories/pickup-area.repository';

@Module({
    providers: [
        // repositories
        PickUpAreaRepositoryProvider,
    ],
})
export class PickupModule {}
