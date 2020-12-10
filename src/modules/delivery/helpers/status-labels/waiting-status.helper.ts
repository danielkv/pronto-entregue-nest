import { Injectable } from '@nestjs/common';
import { IStatusLabelsHelper } from '../../interfaces/status-labels-helper.interface';
import { IStatusLabels } from '../../interfaces/status-labels.interface';

@Injectable()
export class WaitingStatus implements IStatusLabelsHelper {
    readonly name = 'waiting';

    get(): IStatusLabels {
        return {
            default: 'Aguardando',
        };
    }
}
