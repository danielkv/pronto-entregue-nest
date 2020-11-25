import { GeoPoint } from '../../common/types/geo-point';

import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Company } from '../../company-association/company/entities/company.entity';
import { User } from '../../user-association/user/entities/user.entity';
import { GeoPointHelper } from '../../common/helpers/geo.point.helper';

const geoPointHelper = new GeoPointHelper();

@Entity('addresses')
export class Address {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id?: number;

    @Column('varchar', { name: 'name', nullable: true, length: 255 })
    name: string | null;

    @Column('varchar', { name: 'street', nullable: true, length: 255 })
    street: string | null;

    @Column('int', { name: 'number', nullable: true })
    number: number | null;

    @Column('varchar', { name: 'complement', nullable: true, length: 255 })
    complement: string | null;

    @Column('varchar', { name: 'district', nullable: true, length: 255 })
    district: string | null;

    @Column('int', { name: 'zipcode', nullable: true })
    zipcode: number | null;

    @Column('varchar', { name: 'city', nullable: true, length: 255 })
    city: string | null;

    @Column('varchar', { name: 'state', nullable: true, length: 255 })
    state: string | null;

    @Column('point', {
        name: 'location',
        transformer: { to: geoPointHelper.geoPointToText, from: geoPointHelper.textToGeoPoint },
    })
    location: GeoPoint;

    @Column('varchar', { name: 'reference', nullable: true, length: 255 })
    reference: string | null;

    @CreateDateColumn({ name: 'createdAt' })
    createdAt?: Date;

    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt?: Date;

    @OneToMany(
        () => Company,
        companies => companies.address,
    )
    companies?: Company[];

    @ManyToMany(
        () => User,
        user => user.addresses,
    )
    users?: User[];
}
