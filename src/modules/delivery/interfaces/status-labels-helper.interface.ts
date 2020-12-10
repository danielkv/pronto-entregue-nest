import { DeliveryStatusEnum } from '../enums/delivery.status.enum';
import { IStatusLabels } from './status-labels.interface';

export interface IStatusLabelsHelper {
    readonly name: string;
    get(): IStatusLabels;
}
