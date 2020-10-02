import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyMeta } from '../entities/company.meta.entity';

@Injectable()
export class GetCompanyMetaService {
    constructor(
        @InjectRepository(CompanyMeta) private companyMetaRepository: Repository<CompanyMeta>,
    ) {}

    execute(companyId: number, keys: string[]): Promise<CompanyMeta[]> {
        const query = this.companyMetaRepository.createQueryBuilder('meta');

        query.where('meta.companyId = :companyId', { companyId });

        query.andWhere('meta.key IN (:...keys)', { keys });

        return query.getMany();
    }
}
