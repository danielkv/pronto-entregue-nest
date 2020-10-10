import { Info, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ExtractVariablePipe } from 'src/modules/common/pipes/extract-variable.pipe';
import { GeoPoint } from 'src/modules/common/types/geo-point';
import { Company } from '../../company-association/company/entities/company.entity';
import { DeliveryArea } from '../entities/delivery.area.entity';

@Resolver(() => Company)
export class CompanyDeliveryAreaResolver {
    /*   @ResolveField(() => DeliveryArea)
    delivery(
        @Parent() company: Company,
        @Info(new ExtractVariablePipe<GeoPoint>('userLocation')) userLocation: GeoPoint,
    ): Promise<DeliveryArea> {
        console.log(userLocation);
        return await company.deliveryAreas[0];
    } */
}
