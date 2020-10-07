import DataLoader from 'dataloader';

export abstract class DataLoaderBase<KeyType, ReturnType> {
    create?(): DataLoader<KeyType, ReturnType>;
    loader: DataLoader<KeyType, ReturnType>;

    constructor() {
        this.loader = this.create();
    }
}
