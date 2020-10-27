import { Inject, Injectable } from '@nestjs/common';
import { CompanyMetaDTO } from '../dtos/company-meta.dto';
import { CompanyMeta } from '../entities/company.meta.entity';
import { ICompanyMetaRepository } from '../interfaces/company-meta.repository.interface';

@Injectable()
export class SaveCompanyMetasService {
    constructor(@Inject('ICompanyMetaRepository') private companyRepository: ICompanyMetaRepository) {}

    async execute(companyMetas: CompanyMetaDTO[]): Promise<CompanyMeta[]> {
        // create company meta instances
        const metasToSave = this.companyRepository.create(
            companyMetas.map(meta => {
                // if is update remove property key (can't update key)
                if (meta.id) delete meta.key;

                return meta;
            }),
        );

        // save company metas
        const saved = await this.companyRepository.save(metasToSave);

        // return metas
        return saved;
    }
}
