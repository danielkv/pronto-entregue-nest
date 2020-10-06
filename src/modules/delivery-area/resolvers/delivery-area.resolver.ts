import { Args, Info, Query, Resolver } from '@nestjs/graphql';
import { ExtractFieldsPipe } from 'src/modules/common/pipes/extract-fields.pipe';
import { PageInfo } from 'src/modules/common/types/page-info';
import { CountDeliveryAreasService } from '../services/count-delivery-areas.service';
import { ListDeliveryAreasService } from '../services/list-delivery-areas.service';
import { DeliveryAreaList } from '../types/delivery-area-list';
import { DeliveryAreaFilter } from '../types/delivery.area.filter';

@Resolver()
export class DeliveryAreaResolver {
    constructor(
        private listDeliveryAreaService: ListDeliveryAreasService,
        private countDeliveryAreaService: CountDeliveryAreasService,
    ) {}

    @Query(() => DeliveryAreaList)
    async listDelvieryAreas(
        @Info(ExtractFieldsPipe) fields: string[],
        @Args('filter', { type: () => DeliveryAreaFilter, nullable: true })
        filter?: DeliveryAreaFilter,
        @Args('pagination', { type: () => PageInfo, nullable: true }) pagination?: PageInfo,
    ): Promise<DeliveryAreaList> {
        const list: DeliveryAreaList = { pageInfo: pagination };

        // get items
        if (fields.includes('items'))
            list.items = await this.listDeliveryAreaService.execute(filter, pagination);

        // count items
        if (fields.includes('countItems'))
            list.countItems = await this.countDeliveryAreaService.execute(filter);

        // return list
        return list;
    }
}
