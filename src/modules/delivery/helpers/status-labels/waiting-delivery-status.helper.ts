import { Injectable } from '@nestjs/common';
import { IStatusLabelsHelper } from '../../interfaces/status-labels-helper.interface';
import { IStatusLabels } from '../../interfaces/status-labels.interface';

@Injectable()
export class WaitingDeliveryStatus implements IStatusLabelsHelper {
    readonly name = 'waitingDelivery';

    get(): IStatusLabels {
        return {
            default: 'Aguardando entregador',
        };
    }
}
