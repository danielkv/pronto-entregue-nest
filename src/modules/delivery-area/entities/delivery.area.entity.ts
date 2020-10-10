import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { GeoPointHelper } from '../../common/helpers/geo.point.helper';
import { GeoPoint } from '../../common/types/geo-point';
import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Company } from '../../company-association/company/entities/company.entity';
import { OrderTypeEnum } from 'src/modules/order-association/order/enums/order.type.enum';

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

    @Field(() => Float, { nullable: true })
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
    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: 'updatedAt' })
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

    @Field(() => OrderTypeEnum)
    type: OrderTypeEnum;
}
