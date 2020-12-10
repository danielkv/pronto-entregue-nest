import { Global, Module } from '@nestjs/common';
import { GeoPointHelper } from './helpers/geo.point.helper';
import { PageInfo } from './types/page-info';
import { ConfigTransformHelper } from './helpers/config.transform.helper';
import { AddressHelper } from './helpers/address.helper';
import { GetRequestHelper } from './helpers/get-request.helper';
import { PasswordService } from './services/password.service';
import { TransactionHelper } from './helpers/transactionHelper';
import { ConfigToMetaService } from './services/config-to-meta.service';
import { MobileScreenHelper } from './helpers/mobile-redirect.helper';

@Global()
@Module({
    imports: [PageInfo],
    providers: [
        // helpers
        MobileScreenHelper,
        GeoPointHelper,
        ConfigTransformHelper,
        AddressHelper,
        GetRequestHelper,
        TransactionHelper,

        // services
        PasswordService,
        ConfigToMetaService,
    ],
    exports: [
        ConfigTransformHelper,
        AddressHelper,
        GetRequestHelper,
        PasswordService,
        TransactionHelper,
        ConfigToMetaService,
        MobileScreenHelper,
    ],
})
export class CommonModule {}
