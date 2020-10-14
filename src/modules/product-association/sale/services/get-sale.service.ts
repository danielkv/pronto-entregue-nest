import { Inject, Injectable } from '@nestjs/common';
import { Sale } from '../entities/sale.entity';
import { ISaleRepository } from '../interfaces/sale.repository.interface';

@Injectable()
export class GetSaleService {
    constructor(@Inject('ISaleRepository') private saleRepository: ISaleRepository) {}

    execute(saleId: Sale['id']): Promise<Sale>;
    execute(saleId: Sale['id'][]): Promise<Sale[]>;
    execute(saleId: any): Promise<Sale | Sale[]> {
        return this.saleRepository.get(saleId);
    }
}
