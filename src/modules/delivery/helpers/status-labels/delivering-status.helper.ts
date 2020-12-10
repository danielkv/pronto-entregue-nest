import { IStatusLabelsHelper } from '../../interfaces/status-labels-helper.interface';
import { IStatusLabels } from '../../interfaces/status-labels.interface';

export class DeliveringStatus implements IStatusLabelsHelper {
    readonly name = 'delivering';

    get(): IStatusLabels {
        return {
            default: 'A caminho',
        };
    }
}
