import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { GeoPointHelper } from '../../common/helpers/geo.point.helper';
import { GeoPoint } from 'src/modules/common/types/geo-point';
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from '../../company/entities/company.entity';

const geoPointHelper = new GeoPointHelper();

@ObjectType()
@Index('companyId', ['companyId'], {})
@Entity('delivery_areas')
export class DeliveryArea {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Field()
    @Column('varchar', { name: 'name', nullable: true, length: 255 })
    name: string | null;

    @Field(() => GeoPoint, { nullable: true }) //
    @Column('point', {
        name: 'center',
        nullable: true,
        transformer: { to: geoPointHelper.geoPointToText, from: geoPointHelper.textToGeoPoint },
    })
    center: GeoPoint;

    @Field(() => Float)
    @Column('float', { name: 'radius', nullable: true, precision: 12 })
    radius: number | null;

    @Field(() => Float)
    @Column('float', {
        name: 'price',
        nullable: true,
        precision: 12,
    })
    price: number | null;

    @Field()
    @Column('datetime', { name: 'createdAt' })
    createdAt: Date;

    @Field()
    @Column('datetime', { name: 'updatedAt' })
    updatedAt: Date;

    @Column('int', { name: 'companyId', nullable: true })
    companyId: number | null;

    @Field()
    @Column({
        type: 'boolean',
        name: 'active',
        nullable: true,
        default: true,
    })
    active: boolean | null;

    @Field(() => Company)
    @ManyToOne(
        () => Company,
        company => company.deliveryAreas,
        {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn([{ name: 'companyId', referencedColumnName: 'id' }])
    company: Company;

    @Field()
    type: string;
}
