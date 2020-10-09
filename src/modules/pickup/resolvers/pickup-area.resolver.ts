import { Args, Info, Query, Resolver } from '@nestjs/graphql';
import { ExtractFieldsPipe } from 'src/modules/common/pipes/extract-fields.pipe';
import { PageInfo } from 'src/modules/common/types/page-info';
import { CountPickUpAreasService } from '../services/count-pickup-areas.service';
import { ListPickUpAreasService } from '../services/list-pickup-areas.service';
import { PickUpAreaListDTO } from '../dtos/pickup-area.list.dto';
import { PickUpAreaFilterDTO } from '../dtos/pickup-area.filter.dto';

@Resolver()
export class PickUpAreaResolver {
    constructor(
        private listPickUpAreaService: ListPickUpAreasService,
        private countPickUpAreaService: CountPickUpAreasService,
    ) {}

    @Query(() => PickUpAreaListDTO)
    async listDelvieryAreas(
        @Info(ExtractFieldsPipe) fields: string[],
        @Args('filter', { type: () => PickUpAreaFilterDTO, nullable: true })
        filter?: PickUpAreaFilterDTO,
        @Args('pagination', { type: () => PageInfo, nullable: true }) pagination?: PageInfo,
    ): Promise<PickUpAreaListDTO> {
        const list: PickUpAreaListDTO = { pageInfo: pagination };

        // get items
        if (fields.includes('items'))
            list.items = await this.listPickUpAreaService.execute(filter, pagination);

        // count items
        if (fields.includes('countItems'))
            list.countItems = await this.countPickUpAreaService.execute(filter);

        // return list
        return list;
    }
}
