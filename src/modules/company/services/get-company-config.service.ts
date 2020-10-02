import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { CompanyMeta } from '../entities/company.meta.entity';
import { CompanyConfig } from '../types/company-config';

@Injectable()
export class GetCompanyConfigService {
    constructor(
        @InjectRepository(CompanyMeta) private companyMetaRepository: Repository<CompanyMeta>,
    ) {}

    async execute(companyId: number, keys: string[]): Promise<CompanyConfig> {
        const query = await this.companyMetaRepository.createQueryBuilder('meta');

        query.where('companyId = :companyId', { companyId });

        query.andWhere('key IN (:...keys)', { keys });

        const metas = await query.getMany();

        return this.transform(metas);
    }

    transform(metas: CompanyMeta[]) {
        const configs = metas.reduce(function(result, { key, value }) {
            if (!result[key]) result[key] = value;

            return result;
        }, {});

        return plainToClass(CompanyConfig, configs, { enableImplicitConversion: true });
    }
}
