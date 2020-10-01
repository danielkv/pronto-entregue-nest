import { Global, Module } from '@nestjs/common';
import { GeoPointHelper } from './helpers/geo.point.helper';
import { PageInfo } from './types/page-info';
import { PaginationHelper } from './helpers/pagination.helper';

@Global()
@Module({
    imports: [PageInfo],
    providers: [GeoPointHelper, PaginationHelper],
    exports: [PaginationHelper],
})
export class CommonModule {}
