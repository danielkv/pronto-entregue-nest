import { IStatusLabelsHelper } from '../../interfaces/status-labels-helper.interface';
import { IStatusLabels } from '../../interfaces/status-labels.interface';

export class WaitingStatus implements IStatusLabelsHelper {
    readonly name = 'waiting';

    get(): IStatusLabels {
        return {
            default: 'Aguardando',
        };
    }
}
