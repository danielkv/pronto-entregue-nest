import { Injectable, NotFoundException } from '@nestjs/common';
import { NestEventEmitter } from 'nest-event';
import { IMainEvents } from 'src/main-event-emitter/main-events.interface';
import { AddressDTO } from 'src/modules/address/dtos/address.dto';
import { Address } from 'src/modules/address/entities/address.entity';
import { IAddressRepository } from 'src/modules/address/interfaces/address.repository.interface';
import { AddressRepository } from 'src/modules/address/respositories/address.repository';
import { UpdateAddressService } from 'src/modules/address/services/update-address.service';
import { TransactionHelper } from 'src/modules/common/helpers/transactionHelper';
import { EntityManager } from 'typeorm';
import { CompanyMetaDTO } from '../../company-meta/dtos/company-meta.dto';
import { CompanyMeta } from '../../company-meta/entities/company.meta.entity';
import { ICompanyMetaRepository } from '../../company-meta/interfaces/company-meta.repository.interface';
import { CompanyMetaRepository } from '../../company-meta/repositories/company-meta.repository';
import { SaveCompanyMetasService } from '../../company-meta/services/save-company-metas.service';

import { CompanyDTO } from '../dtos/company.dto';
import { Company } from '../entities/company.entity';

import { ICompanyRepository } from '../interfaces/company.repository.interface';
import { IUpdateCompanyEvent } from '../interfaces/update-company-event.interface';
import { CompanyRepository } from '../repositories/company.repository';

@Injectable()
export class UpdateCompanyService {
    constructor(private transactionHelper: TransactionHelper, private readonly eventEmitter: NestEventEmitter) {}

    async execute(companyId: Company['id'], company: CompanyDTO): Promise<Company> {
        const updated = await this.transactionHelper.execute(async manager => {
            // get transaction repository
            const companyRepository: ICompanyRepository = manager.getCustomRepository(CompanyRepository);

            // check if company exists
            const oldCompany = await companyRepository.get(companyId);
            if (!oldCompany) throw new NotFoundException('Empresa não existe');

            // merge data
            const mergedCompany = companyRepository.merge(oldCompany, company);

            // create new company
            const updatedCompany = await companyRepository.save(mergedCompany);

            // check if there are metas to save
            if (company?.metas?.length) this.saveCompanyMetas(manager, company.metas);

            // address
            this.updateCompanyAddress(manager, company.address);

            return updatedCompany;
        });

        // events
        const event: IUpdateCompanyEvent = {
            company: updated,
        };
        this.eventEmitter.strictEmitter<IMainEvents>().emit('updateCompany', event);

        // return company
        return updated;
    }

    private updateCompanyAddress(manager: EntityManager, address: AddressDTO): Promise<Address> {
        // get transaction repository and save
        const addressRepository: IAddressRepository = manager.getCustomRepository(AddressRepository);

        // create service instance
        const updateAddressService = new UpdateAddressService(addressRepository, this.eventEmitter);

        // return
        return updateAddressService.execute(address.id, address);
    }

    private saveCompanyMetas(manager: EntityManager, metas: CompanyMetaDTO[]): Promise<CompanyMeta[]> {
        // get transaction repository and save
        const companyMetaRepository: ICompanyMetaRepository = manager.getCustomRepository(CompanyMetaRepository);

        // create service instance
        const saveCompanyMetasService = new SaveCompanyMetasService(companyMetaRepository);

        // return
        return saveCompanyMetasService.execute(metas);
    }
}
