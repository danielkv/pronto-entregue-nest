import { Injectable } from '@nestjs/common';
import { Address } from '../../address/entities/address.entity';
import { IEntityAddress } from '../interfaces/entity.address.interface';

@Injectable()
export class AddressHelper<EntityAddressDTO> {
    split(model: EntityAddressDTO, suffix = ''): Address {
        return {
            name: model[`nameAddress${suffix}`],
            street: model[`streetAddress${suffix}`],
            number: model[`numberAddress${suffix}`],
            complement: model[`complementAddress${suffix}`],
            zipcode: model[`zipcodeAddress${suffix}`],
            district: model[`districtAddress${suffix}`],
            city: model[`cityAddress${suffix}`],
            state: model[`stateAddress${suffix}`],
            reference: model[`referenceAddress${suffix}`],
            location: model[`locationAddress${suffix}`],
        };
    }

    join(address: Address, suffix = ''): IEntityAddress {
        return {
            [`nameAddress${suffix}`]: address.name,
            [`streetAddress${suffix}`]: address.street,
            [`numberAddress${suffix}`]: address.number,
            [`complementAddress${suffix}`]: address.complement,
            [`zipcodeAddress${suffix}`]: address.zipcode,
            [`districtAddress${suffix}`]: address.district,
            [`cityAddress${suffix}`]: address.city,
            [`stateAddress${suffix}`]: address.state,
            [`referenceAddress${suffix}`]: address.reference,
            [`locationAddress${suffix}`]: address.location,
        };
    }
}
