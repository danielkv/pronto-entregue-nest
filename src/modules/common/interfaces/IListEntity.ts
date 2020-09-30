import { IPageInfo } from './IPageInfo';

export interface IListEntity<Entity> {
    items: Entity[];
    countItems: number;
    pageInfo?: IPageInfo;
}
