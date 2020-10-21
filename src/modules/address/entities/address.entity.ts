import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
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

@ObjectType()
@Entity('addresses')
export class Address {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id?: number;

    @Field({ nullable: true })
    @Column('varchar', { name: 'name', nullable: true, length: 255 })
    name: string | null;

    @Field({ nullable: true })
    @Column('varchar', { name: 'street', nullable: true, length: 255 })
    street: string | null;

    @Field(() => Int)
    @Column('int', { name: 'number', nullable: true })
    number: number | null;

    @Field({ nullable: true })
    @Column('varchar', { name: 'complement', nullable: true, length: 255 })
    complement: string | null;

    @Field()
    @Column('varchar', { name: 'district', nullable: true, length: 255 })
    district: string | null;

    @Field(() => Int)
    @Column('int', { name: 'zipcode', nullable: true })
    zipcode: number | null;

    @Field()
    @Column('varchar', { name: 'city', nullable: true, length: 255 })
    city: string | null;

    @Field()
    @Column('varchar', { name: 'state', nullable: true, length: 255 })
    state: string | null;

    @Field(() => GeoPoint)
    @Column('point', {
        name: 'location',
        transformer: { to: geoPointHelper.geoPointToText, from: geoPointHelper.textToGeoPoint },
    })
    location: GeoPoint;

    @Field({ nullable: true })
    @Column('varchar', { name: 'reference', nullable: true, length: 255 })
    reference: string | null;

    @Field()
    @CreateDateColumn({ name: 'createdAt' })
    createdAt?: Date;

    @Field()
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
