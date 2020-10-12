import { Global, Module } from '@nestjs/common';
import { GeoPointHelper } from './helpers/geo.point.helper';
import { PageInfo } from './types/page-info';
import { ConfigTransformHelper } from './helpers/config.transform.helper';
import { AddressHelper } from './helpers/address.helper';

@Global()
@Module({
    imports: [PageInfo],
    providers: [GeoPointHelper, ConfigTransformHelper, AddressHelper],
    exports: [ConfigTransformHelper, AddressHelper],
})
export class CommonModule {}
