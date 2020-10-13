import { Module } from '@nestjs/common';
import { PickUpAreaActiveFilter } from './filters/pickup-area.active.filter';
import { PickUpAreaCompaniesFilter } from './filters/pickup-area.companies.filter';
import { PickUpAreaLocationFilter } from './filters/pickup-area.location.filter';
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

        // filters
        PickUpAreaActiveFilter,
        PickUpAreaCompaniesFilter,
        PickUpAreaLocationFilter,

        // resolvers
        QueryPickUpAreaResolver,

        // repositories
        PickUpAreaRepositoryProvider,
    ],
})
export class PickupModule {}
