import { Global, Module } from '@nestjs/common';
import { GeoPointHelper } from './helpers/geo.point.helper';
import { PageInfo } from './types/page-info';
import { ConfigTransformHelper } from './helpers/config.transform.helper';
import { AddressHelper } from './helpers/address.helper';
import { GetRequestHelper } from './helpers/get-request.helper';
import { PasswordService } from './services/password.service';
import { TransactionHelper } from './helpers/transactionHelper';

@Global()
@Module({
    imports: [PageInfo],
    providers: [
        // helpers
        GeoPointHelper,
        ConfigTransformHelper,
        AddressHelper,
        GetRequestHelper,
        TransactionHelper,

        // services
        PasswordService,
    ],
    exports: [ConfigTransformHelper, AddressHelper, GetRequestHelper, PasswordService, TransactionHelper],
})
export class CommonModule {}
