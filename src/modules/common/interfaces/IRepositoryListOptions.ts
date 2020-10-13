import { OrderByCondition } from 'typeorm';
import { PageInfo } from '../types/page-info';
import { IRepositoryFiltersOptions } from './IRepositoryFiltersOptions';

export interface IRepositoryListOptions<Entity, EntityFilterDTO>
    extends IRepositoryFiltersOptions<Entity, EntityFilterDTO> {
    pagination?: PageInfo;
    orderBy?: OrderByCondition;
}
