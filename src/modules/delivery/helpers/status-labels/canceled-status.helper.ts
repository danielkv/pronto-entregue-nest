import { Injectable } from '@nestjs/common';
import { IStatusLabelsHelper } from '../../interfaces/status-labels-helper.interface';
import { IStatusLabels } from '../../interfaces/status-labels.interface';

@Injectable()
export class CanceledStatus implements IStatusLabelsHelper {
    readonly name = 'canceled';

    get(): IStatusLabels {
        return {
            default: 'Cancelado',
        };
    }
}
