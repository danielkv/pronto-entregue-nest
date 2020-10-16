import DataLoader from 'dataloader';
import { IDataLoaderCreate } from './data-loader-create.interface';

export interface IDataLoaderBase<KeyType, ReturnType> {
    loader: DataLoader<KeyType, ReturnType>;
    create(): IDataLoaderCreate<KeyType, ReturnType>;
}
