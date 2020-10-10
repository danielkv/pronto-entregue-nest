import { Injectable } from '@nestjs/common';
import { OrderTypeEnum } from 'src/modules/order-association/order/enums/order.type.enum';
import { Company } from '../entities/company.entity';

@Injectable()
export class GetCompanyOrderTypeService {
    execute({ deliveryAreas, pickUpAreas }: Company): OrderTypeEnum[] {
        const orderTypes: OrderTypeEnum[] = [];

        if (deliveryAreas.filter(deliveryArea => deliveryArea.type === OrderTypeEnum.DELIVERY).length)
            orderTypes.push(OrderTypeEnum.DELIVERY);

        if (deliveryAreas.filter(deliveryArea => deliveryArea.type === OrderTypeEnum.PE_DELIVERY).length)
            orderTypes.push(OrderTypeEnum.PE_DELIVERY);

        if (pickUpAreas.length) orderTypes.push(OrderTypeEnum.PICK_UP);

        return orderTypes;
    }
}
