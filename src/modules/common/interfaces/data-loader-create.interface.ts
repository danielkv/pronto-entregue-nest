import DataLoader from 'dataloader';

export interface IDataLoaderCreate<KeyType, ReturnType, C = KeyType> {
    batchLoadFn: DataLoader.BatchLoadFn<KeyType, ReturnType>;
    options?: DataLoader.Options<KeyType, ReturnType, C>;
}
