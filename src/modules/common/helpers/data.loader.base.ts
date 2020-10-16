import * as DataLoader from 'dataloader';
import { IDataLoaderCreate } from '../interfaces/data-loader-create.interface';

export abstract class DataLoaderBase<KeyType, ReturnType> {
    create?(): IDataLoaderCreate<KeyType, ReturnType>;
    loader: DataLoader<KeyType, ReturnType>;

    constructor() {
        const { batchLoadFn, options = {} } = this.create();

        if (!options?.cache) options.cache = false;

        this.loader = new DataLoader<KeyType, ReturnType>(batchLoadFn, options);
    }

    remap(keys: KeyType[], results: ReturnType[], typeKey = 'id'): ReturnType[] | null {
        return keys.map(key => results.find(res => res[typeKey] === key) || null);
    }
}
