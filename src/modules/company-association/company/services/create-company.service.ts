import { Injectable } from '@nestjs/common';
import { NestEventEmitter } from 'nest-event';
import { IMainEvents } from 'src/main-event-emitter/main-events.interface';
import { AddressDTO } from 'src/modules/address/dtos/address.dto';
import { Address } from 'src/modules/address/entities/address.entity';
import { IAddressRepository } from 'src/modules/address/interfaces/address.repository.interface';
import { AddressRepository } from 'src/modules/address/respositories/address.repository';
import { CreateAddressService } from 'src/modules/address/services/create-address.service';
import { TransactionHelper } from 'src/modules/common/helpers/transactionHelper';
import { EntityManager } from 'typeorm';
import { CompanyMetaDTO } from '../../company-meta/dtos/company-meta.dto';
import { CompanyMeta } from '../../company-meta/entities/company.meta.entity';
import { ICompanyMetaRepository } from '../../company-meta/interfaces/company-meta.repository.interface';
import { CompanyMetaRepository } from '../../company-meta/repositories/company-meta.repository';
import { SaveCompanyMetasService } from '../../company-meta/services/save-company-metas.service';

import { CompanyDTO } from '../entities/company.dto';
import { Company } from '../entities/company.entity';

import { ICompanyRepository } from '../interfaces/company.repository.interface';
import { ICreateCompanyEvent } from '../interfaces/create-company-event.interface';
import { CompanyRepository } from '../repositories/company.repository';

@Injectable()
export class CreateCompanyService {
    constructor(private transactionHelper: TransactionHelper, private readonly eventEmitter: NestEventEmitter) {}

    async execute(company: CompanyDTO): Promise<Company> {
        const created = await this.transactionHelper.execute(async manager => {
            // get transaction repository
            const companyRepository: ICompanyRepository = manager.getCustomRepository(CompanyRepository);

            // create company instance
            const companyInstace = companyRepository.create(company);

            // check if there are metas to save
            if (company?.metas?.length) this.saveCompanyMetas(manager, company.metas);

            // address
            const newAddress = await this.createCompanyAddress(manager, company.address);

            // merge addressId
            const companyToSave = companyRepository.merge(companyInstace, { addressId: newAddress.id });

            // create new company
            const newCompany = await companyRepository.save(companyToSave);

            return newCompany;
        });

        // events
        const event: ICreateCompanyEvent = {
            company: created,
        };
        this.eventEmitter.strictEmitter<IMainEvents>().emit('createCompany', event);

        // return company
        return created;
    }

    private createCompanyAddress(manager: EntityManager, address: AddressDTO): Promise<Address> {
        // get transaction repository and save
        const addressRepository: IAddressRepository = manager.getCustomRepository(AddressRepository);

        // create service instance
        const createAddressService = new CreateAddressService(addressRepository, this.eventEmitter);

        // return
        return createAddressService.execute(address);
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
