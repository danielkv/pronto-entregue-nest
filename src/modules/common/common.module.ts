import { Global, Module } from '@nestjs/common';
import { FilterHelper } from './helpers/filter.helper';
import { GeoPointHelper } from './helpers/geo.point.helper';
import { PageInfo } from './types/page-info';
import { PaginationHelper } from './helpers/pagination.helper';

@Global()
@Module({
    imports: [PageInfo],
    providers: [GeoPointHelper, FilterHelper, PaginationHelper],
    exports: [FilterHelper, PaginationHelper],
})
export class CommonModule {}
