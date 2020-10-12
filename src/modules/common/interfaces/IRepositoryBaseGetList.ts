import { OrderByCondition } from 'typeorm';
import { PageInfo } from '../types/page-info';

export interface IRepositoryBaseGetList<EntityFilterDTO> {
    filter?: EntityFilterDTO;
    pagination?: PageInfo;
    orderBy?: OrderByCondition;
}
