import { IStatusLabelsHelper } from '../../interfaces/status-labels-helper.interface';
import { IStatusLabels } from '../../interfaces/status-labels.interface';

export class CanceledStatus implements IStatusLabelsHelper {
    readonly name = 'canceled';

    get(): IStatusLabels {
        return {
            default: 'Cancelado',
        };
    }
}
