import { Injectable } from '@nestjs/common';
import { DeliveryArea } from 'src/modules/delivery-area/entities/delivery.area.entity';
import { OrderTypeEnum } from 'src/modules/order-association/order/enums/order.type.enum';
import { PickUpArea } from 'src/modules/pickup/entities/pickup-area.entity';

@Injectable()
export class GetCompanyOrderTypeService {
    execute(deliveryAreas: DeliveryArea[], pickUpAreas: PickUpArea[]): OrderTypeEnum[] {
        const orderTypes: OrderTypeEnum[] = [];

        if (deliveryAreas.filter(deliveryArea => deliveryArea.type === OrderTypeEnum.DELIVERY).length)
            orderTypes.push(OrderTypeEnum.DELIVERY);

        if (deliveryAreas.filter(deliveryArea => deliveryArea.type === OrderTypeEnum.PE_DELIVERY).length)
            orderTypes.push(OrderTypeEnum.PE_DELIVERY);

        if (pickUpAreas.length) orderTypes.push(OrderTypeEnum.PICK_UP);

        return orderTypes;
    }
}
