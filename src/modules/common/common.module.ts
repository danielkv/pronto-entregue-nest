import { Global, Module } from '@nestjs/common';
import { GeoPointHelper } from './helpers/geo.point.helper';
import { PageInfo } from './types/page-info';
import { ConfigTransformHelper } from './helpers/config.transform.helper';

@Global()
@Module({
    imports: [PageInfo],
    providers: [GeoPointHelper, ConfigTransformHelper],
    exports: [ConfigTransformHelper],
})
export class CommonModule {}
