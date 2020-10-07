import DataLoader from 'dataloader';

export interface IDataLoaderBase<KeyType, ReturnType> {
    create(): DataLoader<KeyType, ReturnType>;
}
