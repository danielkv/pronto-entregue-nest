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
import { DeliveryAreaTypeEnum } from '../enums/delivery-area-type.enum';

const geoPointHelper = new GeoPointHelper();

@Index('companyId', ['companyId'], {})
@Entity('delivery_areas')
export class DeliveryArea {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'name', nullable: true, length: 255 })
    name: string | null;

    @Column('point', {
        name: 'center',
        nullable: true,
        transformer: { to: geoPointHelper.geoPointToText, from: geoPointHelper.textToGeoPoint },
    })
    center: GeoPoint;

    @Column('float', { name: 'radius', nullable: true, precision: 12 })
    radius: number | null;

    @Column('float', {
        name: 'price',
        nullable: true,
        precision: 12,
    })
    price: number | null;

    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;

    @Column('int', { name: 'companyId', nullable: true })
    companyId: number | null;

    @Column({
        type: 'boolean',
        name: 'active',
        nullable: true,
        default: true,
    })
    active: boolean | null;

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

    @Column({
        type: 'enum',
        nullable: false,
        enum: DeliveryAreaTypeEnum,
        default: DeliveryAreaTypeEnum.DELIVERY,
    })
    type: DeliveryAreaTypeEnum;
}
