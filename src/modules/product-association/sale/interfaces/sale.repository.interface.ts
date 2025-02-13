import { IRepositoryBase } from 'src/modules/common/interfaces/repository.base.interface';
import { SaleFilterDTO } from '../dtos/sale.filter.dto';
import { Sale } from '../entities/sale.entity';

export interface ISaleRepository extends IRepositoryBase<Sale, SaleFilterDTO> {}
