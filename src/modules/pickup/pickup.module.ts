import { Module } from '@nestjs/common';
import { PickUpAreaRepositoryProvider } from './repositories/pickup-area.repository';
import { QueryPickUpAreaResolver } from './resolvers/query.pickup-area.resolver';
import { CountPickUpAreasService } from './services/count-pickup-areas.service';
import { GetPickUpAreaService } from './services/get-pickup-area.service';
import { ListPickUpAreasService } from './services/list-pickup-areas.service';

@Module({
    providers: [
        // services
        ListPickUpAreasService,
        CountPickUpAreasService,
        GetPickUpAreaService,

        // resolvers
        QueryPickUpAreaResolver,

        // repositories
        PickUpAreaRepositoryProvider,
    ],
})
export class PickupModule {}
