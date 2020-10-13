import { IFilter } from './IFilter';

export interface IRepositoryFiltersOptions<Entity, EntityFilterDTO> {
    filterHelpers?: IFilter<Entity, EntityFilterDTO>[];
    filter?: EntityFilterDTO;
}
