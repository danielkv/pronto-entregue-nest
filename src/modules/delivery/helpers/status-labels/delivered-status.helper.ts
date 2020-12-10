import { IStatusLabelsHelper } from '../../interfaces/status-labels-helper.interface';
import { IStatusLabels } from '../../interfaces/status-labels.interface';

export class DeliveredStatus implements IStatusLabelsHelper {
    readonly name = 'delivered';

    get(): IStatusLabels {
        return {
            default: 'Entregue',
        };
    }
}
