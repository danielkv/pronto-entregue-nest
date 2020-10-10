import DataLoader from 'dataloader';

export abstract class DataLoaderBase<KeyType, ReturnType> {
    create?(): DataLoader<KeyType, ReturnType>;
    loader: DataLoader<KeyType, ReturnType>;

    constructor() {
        this.loader = this.create();
    }

    remap(keys: KeyType[], results: ReturnType[], typeKey = 'id'): ReturnType[] | null {
        return keys.map(key => results.find(res => res[typeKey] === key) || null);
    }
}
