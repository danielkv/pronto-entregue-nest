import { Field, Float, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { GeoPointHelper } from 'src/modules/common/helpers/geo.point.helper';
import { GeoPoint } from 'src/modules/common/types/geo-point';
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '../../order-association/order/entities/order.entity';
import { User } from '../../user/entities/user.entity';
import { DeliveryStatusEnum } from '../enums/delivery.status.enum';

const geoPointHelper = new GeoPointHelper();

registerEnumType(DeliveryStatusEnum, { name: 'DeliveryStatusEnum' });

@ObjectType()
@Index('orderId', ['orderId'], {})
@Index('deliveryManId', ['deliveryManId'], {})
@Entity('deliveries')
export class Delivery {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Field()
    @Column('varchar', { name: 'description', nullable: true, length: 255 })
    description: string | null;

    @Column('enum', {
        name: 'size',
        nullable: true,
        enum: ['small', 'medium', 'large'],
        default: 'medium',
    })
    size: 'small' | 'medium' | 'large' | null;

    @Column('enum', {
        name: 'status',
        nullable: true,
        enum: DeliveryStatusEnum,
        default: DeliveryStatusEnum.WAITING_DELIVERY,
    })
    status: DeliveryStatusEnum;

    @Field(() => Float)
    @Column('decimal', {
        name: 'value',
        nullable: true,
        precision: 2,
        scale: 0,
    })
    value: number | null;

    @Field()
    @Column('varchar', { name: 'receiverName', nullable: true, length: 255 })
    receiverName: string | null;

    @Field()
    @Column('varchar', { name: 'receiverContact', nullable: true, length: 255 })
    receiverContact: string | null;

    @Field()
    @Column('varchar', { name: 'senderContact', nullable: true, length: 255 })
    senderContact: string | null;

    @Field()
    @Column('varchar', { name: 'nameAddressFrom', nullable: true, length: 255 })
    nameAddressFrom: string | null;

    @Field()
    @Column('varchar', {
        name: 'streetAddressFrom',
        nullable: true,
        length: 255,
    })
    streetAddressFrom: string | null;

    @Field(() => Int)
    @Column('int', { name: 'numberAddressFrom', nullable: true })
    numberAddressFrom: number | null;

    @Field()
    @Column('varchar', {
        name: 'complementAddressFrom',
        nullable: true,
        length: 255,
    })
    complementAddressFrom: string | null;

    @Field()
    @Column('varchar', {
        name: 'districtAddressFrom',
        nullable: true,
        length: 255,
    })
    districtAddressFrom: string | null;

    @Field(() => Int)
    @Column('int', { name: 'zipcodeAddressFrom', nullable: true })
    zipcodeAddressFrom: number | null;

    @Field()
    @Column('varchar', { name: 'cityAddressFrom', nullable: true, length: 255 })
    cityAddressFrom: string | null;

    @Field()
    @Column('varchar', {
        name: 'stateAddressFrom',
        nullable: true,
        length: 255,
    })
    stateAddressFrom: string | null;

    @Field()
    @Column('varchar', {
        name: 'referenceAddressFrom',
        nullable: true,
        length: 255,
    })
    referenceAddressFrom: string | null;

    @Field(() => GeoPoint)
    @Column('point', {
        name: 'locationAddressFrom',
        nullable: true,
        transformer: { to: geoPointHelper.geoPointToText, from: geoPointHelper.textToGeoPoint },
    })
    locationAddressFrom: GeoPoint;

    @Field()
    @Column('varchar', { name: 'nameAddressTo', nullable: true, length: 255 })
    nameAddressTo: string | null;

    @Field()
    @Column('varchar', { name: 'streetAddressTo', nullable: true, length: 255 })
    streetAddressTo: string | null;

    @Field(() => Int)
    @Column('int', { name: 'numberAddressTo', nullable: true })
    numberAddressTo: number | null;

    @Field()
    @Column('varchar', {
        name: 'complementAddressTo',
        nullable: true,
        length: 255,
    })
    complementAddressTo: string | null;

    @Field()
    @Column('varchar', {
        name: 'districtAddressTo',
        nullable: true,
        length: 255,
    })
    districtAddressTo: string | null;

    @Field(() => Int)
    @Column('int', { name: 'zipcodeAddressTo', nullable: true })
    zipcodeAddressTo: number | null;

    @Field()
    @Column('varchar', { name: 'cityAddressTo', nullable: true, length: 255 })
    cityAddressTo: string | null;

    @Field()
    @Column('varchar', { name: 'stateAddressTo', nullable: true, length: 255 })
    stateAddressTo: string | null;

    @Field()
    @Column('varchar', {
        name: 'referenceAddressTo',
        nullable: true,
        length: 255,
    })
    referenceAddressTo: string | null;

    @Field(() => GeoPoint) //GeoPointScalar
    @Column('point', {
        name: 'locationAddressTo',
        nullable: true,
        transformer: { to: geoPointHelper.geoPointToText, from: geoPointHelper.textToGeoPoint },
    })
    locationAddressTo: GeoPoint;

    @Field()
    @Column('datetime', { name: 'createdAt' })
    createdAt: Date;

    @Field()
    @Column('datetime', { name: 'updatedAt' })
    updatedAt: Date;

    @Column('int', { name: 'orderId', nullable: true })
    orderId: number | null;

    @Column('int', { name: 'deliveryManId', nullable: true })
    deliveryManId: number | null;

    @Field(() => Order)
    @ManyToOne(
        () => Order,
        orders => orders.deliveries,
        {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn([{ name: 'orderId', referencedColumnName: 'id' }])
    order: Order;

    @Field(() => User)
    @ManyToOne(
        () => User,
        users => users.deliveries,
        {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn([{ name: 'deliveryManId', referencedColumnName: 'id' }])
    deliveryMan: User;
}
