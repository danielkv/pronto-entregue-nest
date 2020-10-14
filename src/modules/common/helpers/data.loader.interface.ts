import DataLoader from 'dataloader';

export interface IDataLoaderBase<KeyType, ReturnType> {
    loader: DataLoader<KeyType, ReturnType>;
    create(): DataLoader<KeyType, ReturnType>;
}
