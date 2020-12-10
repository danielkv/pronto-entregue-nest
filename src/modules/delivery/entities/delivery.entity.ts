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
import { Order } from '../../order-association/order/entities/order.entity';
import { User } from '../../user-association/user/entities/user.entity';
import { DeliveryStatusEnum } from '../enums/delivery.status.enum';
import { DeliverySizesEnum } from '../enums/delivery-sizes.enum';
import { Company } from 'src/modules/company-association/company/entities/company.entity';

const geoPointHelper = new GeoPointHelper();

@Index('orderId', ['orderId'], {})
@Index('deliveryManId', ['deliveryManId'], {})
@Entity('deliveries')
export class Delivery {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'description', nullable: true, length: 255 })
    description: string;

    @Column('enum', {
        name: 'size',
        nullable: true,
        enum: DeliverySizesEnum,
        default: DeliverySizesEnum.MEDIUM,
    })
    size: DeliverySizesEnum;

    @Column('enum', {
        name: 'status',
        nullable: true,
        enum: DeliveryStatusEnum,
        default: DeliveryStatusEnum.WAITING_DELIVERY,
    })
    status: DeliveryStatusEnum;

    @Column('decimal', {
        name: 'value',
        nullable: true,
        precision: 2,
        scale: 0,
    })
    value: number;

    @Column('varchar', { name: 'receiverName', nullable: true, length: 255 })
    receiverName: string;

    @Column('varchar', { name: 'receiverContact', nullable: true, length: 255 })
    receiverContact: string;

    @Column('varchar', { name: 'senderContact', nullable: true, length: 255 })
    senderContact: string;

    @Column('varchar', { name: 'nameAddressFrom', nullable: true, length: 255 })
    nameAddressFrom: string;

    @Column('varchar', {
        name: 'streetAddressFrom',
        nullable: true,
        length: 255,
    })
    streetAddressFrom: string;

    @Column('int', { name: 'numberAddressFrom', nullable: true })
    numberAddressFrom: number;

    @Column('varchar', {
        name: 'complementAddressFrom',
        nullable: true,
        length: 255,
    })
    complementAddressFrom: string;

    @Column('varchar', {
        name: 'districtAddressFrom',
        nullable: true,
        length: 255,
    })
    districtAddressFrom: string;

    @Column('int', { name: 'zipcodeAddressFrom', nullable: true })
    zipcodeAddressFrom: number;

    @Column('varchar', { name: 'cityAddressFrom', nullable: true, length: 255 })
    cityAddressFrom: string;

    @Column('varchar', {
        name: 'stateAddressFrom',
        nullable: true,
        length: 255,
    })
    stateAddressFrom: string;

    @Column('varchar', {
        name: 'referenceAddressFrom',
        nullable: true,
        length: 255,
    })
    referenceAddressFrom: string;

    @Column('point', {
        name: 'locationAddressFrom',
        nullable: true,
        transformer: { to: geoPointHelper.geoPointToText, from: geoPointHelper.textToGeoPoint },
    })
    locationAddressFrom: GeoPoint;

    @Column('varchar', { name: 'nameAddressTo', nullable: true, length: 255 })
    nameAddressTo: string;

    @Column('varchar', { name: 'streetAddressTo', nullable: true, length: 255 })
    streetAddressTo: string;

    @Column('int', { name: 'numberAddressTo', nullable: true })
    numberAddressTo: number;

    @Column('varchar', {
        name: 'complementAddressTo',
        nullable: true,
        length: 255,
    })
    complementAddressTo: string;

    @Column('varchar', {
        name: 'districtAddressTo',
        nullable: true,
        length: 255,
    })
    districtAddressTo: string;

    @Column('int', { name: 'zipcodeAddressTo', nullable: true })
    zipcodeAddressTo: number;

    @Column('varchar', { name: 'cityAddressTo', nullable: true, length: 255 })
    cityAddressTo: string;

    @Column('varchar', { name: 'stateAddressTo', nullable: true, length: 255 })
    stateAddressTo: string;

    @Column('varchar', {
        name: 'referenceAddressTo',
        nullable: true,
        length: 255,
    })
    referenceAddressTo: string;

    @Column('point', {
        name: 'locationAddressTo',
        nullable: true,
        transformer: { to: geoPointHelper.geoPointToText, from: geoPointHelper.textToGeoPoint },
    })
    locationAddressTo: GeoPoint;

    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;

    @Column('int', { name: 'orderId', nullable: true })
    orderId: number;

    @Column('int', { name: 'deliveryManId', nullable: true })
    deliveryManId: number;

    @Column('int', { name: 'companyId', default: 10 })
    companyId: number;

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

    @ManyToOne(
        () => Company,
        users => users.deliveries,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn([{ name: 'companyId', referencedColumnName: 'id' }])
    company: Company;

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
