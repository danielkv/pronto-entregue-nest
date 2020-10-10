import { Info, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ExtractVariablePipe } from 'src/modules/common/pipes/extract-variable.pipe';
import { GeoPoint } from 'src/modules/common/types/geo-point';
import { OrderTypeEnum } from 'src/modules/order-association/order/enums/order.type.enum';
import { Company } from '../entities/company.entity';

@Resolver(() => Company)
export class CompanyResolver {
    @ResolveField(() => [OrderTypeEnum])
    orderType(
        @Parent() company: Company,
        @Info(new ExtractVariablePipe<GeoPoint>('userLocation')) userLocation: GeoPoint,
    ): OrderTypeEnum[] {
        if (!userLocation) throw new Error('Localização do usuário não definida');

        const orderTypes: OrderTypeEnum[] = [];

        if (company.deliveryAreas.filter(deliveryArea => deliveryArea.type === OrderTypeEnum.DELIVERY).length)
            orderTypes.push(OrderTypeEnum.DELIVERY);

        if (company.deliveryAreas.filter(deliveryArea => deliveryArea.type === OrderTypeEnum.PE_DELIVERY).length)
            orderTypes.push(OrderTypeEnum.PE_DELIVERY);

        if (company.viewAreas.length) orderTypes.push(OrderTypeEnum.PICK_UP);

        return orderTypes;
    }
}
