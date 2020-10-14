import { RepositoryProviderFactory } from 'src/modules/common/helpers/repository-provider.factory';
import { RepositoryBase } from 'src/modules/common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { SaleFilterDTO } from '../dtos/sale.filter.dto';
import { Sale } from '../entities/sale.entity';
import { ISaleRepository } from '../interface/sale.repository.interface';

@EntityRepository(Sale)
export class SaleRepository extends RepositoryBase<Sale, SaleFilterDTO> implements ISaleRepository {
    constructor() {
        super();

        this.setQueryBuilderTableName('product');
    }
}

export const SaleRepositoryProvider = new RepositoryProviderFactory('ISaleRepository', SaleRepository).create();
