import { Global, Module } from '@nestjs/common';
import { FilterHelper } from './helpers/filter.helper';
import { GeoPointHelper } from './helpers/geo-point-helper';

@Global()
@Module({
    providers: [GeoPointHelper, FilterHelper],
    exports: [FilterHelper],
})
export class CommonModule {}
