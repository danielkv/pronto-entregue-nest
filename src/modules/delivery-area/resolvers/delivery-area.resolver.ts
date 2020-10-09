import { Args, Info, Query, Resolver } from '@nestjs/graphql';
import { ExtractFieldsPipe } from '../../common/pipes/extract-fields.pipe';
import { PageInfo } from '../../common/types/page-info';
import { CountDeliveryAreasService } from '../services/count-delivery-areas.service';
import { ListDeliveryAreasService } from '../services/list-delivery-areas.service';
import { DeliveryAreaListDTO } from '../dtos/delivery-area.list.dto';
import { DeliveryAreaFilterDTO } from '../dtos/delivery.area.filter.dto';

@Resolver()
export class DeliveryAreaResolver {
    constructor(
        private listDeliveryAreaService: ListDeliveryAreasService,
        private countDeliveryAreaService: CountDeliveryAreasService,
    ) {}

    @Query(() => DeliveryAreaListDTO)
    async listDelvieryAreas(
        @Info(ExtractFieldsPipe) fields: string[],
        @Args('filter', { type: () => DeliveryAreaFilterDTO, nullable: true })
        filter?: DeliveryAreaFilterDTO,
        @Args('pagination', { type: () => PageInfo, nullable: true }) pagination?: PageInfo,
    ): Promise<DeliveryAreaListDTO> {
        const list: DeliveryAreaListDTO = { pageInfo: pagination };

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
