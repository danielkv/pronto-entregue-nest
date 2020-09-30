import { Global, Module } from '@nestjs/common';
import { FilterHelper } from './helpers/filter.helper';
import { GeoPointHelper } from './helpers/geo-point-helper';
import { PageInfo } from './types/page-info';

@Global()
@Module({
    imports: [PageInfo],
    providers: [GeoPointHelper, FilterHelper],
    exports: [FilterHelper],
})
export class CommonModule {}
