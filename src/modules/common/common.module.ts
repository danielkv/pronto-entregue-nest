import { Global, Module } from '@nestjs/common';
import { GeoPointHelper } from './helpers/geo.point.helper';
import { PageInfo } from './types/page-info';
import { PaginationHelper } from './helpers/pagination.helper';
import { ConfigTransformHelper } from './helpers/config.transform.helper';

@Global()
@Module({
    imports: [PageInfo],
    providers: [GeoPointHelper, PaginationHelper, ConfigTransformHelper],
    exports: [PaginationHelper, ConfigTransformHelper],
})
export class CommonModule {}
