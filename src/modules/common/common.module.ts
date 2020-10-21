import { Global, Module } from '@nestjs/common';
import { GeoPointHelper } from './helpers/geo.point.helper';
import { PageInfo } from './types/page-info';
import { ConfigTransformHelper } from './helpers/config.transform.helper';
import { AddressHelper } from './helpers/address.helper';
import { GetRequestHelper } from './helpers/get-request.helper';
import { PasswordService } from './services/password.service';

@Global()
@Module({
    imports: [PageInfo],
    providers: [GeoPointHelper, ConfigTransformHelper, AddressHelper, GetRequestHelper, PasswordService],
    exports: [ConfigTransformHelper, AddressHelper, GetRequestHelper, PasswordService],
})
export class CommonModule {}
