import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../../category/entities/category.entity';
import { CompanySection } from '../../company-section/entities/company.type.entity';
import { Address } from '../../../address/entities/address.entity';
import { CompanyMeta } from '../../company-meta/entities/company.meta.entity';
import { CompanyPaymentMethod } from '../../company-payment-method/entities/company.payment.method.entity';
import { CompanyUser } from '../../company-user/entities/company.user.entity';
import { DeliveryArea } from '../../../delivery-area/entities/delivery.area.entity';
import { Order } from '../../../order-association/order/entities/order.entity';
import { Product } from '../../../product-association/product/entities/product.entity';
import { Rating } from '../../../rating/entities/rating.entity';
import { PickUpArea } from '../../../pickup/entities/pickup-area.entity';
import { Coupon } from '../../../coupon/entities/coupon.entity';
import { OrderTypeEnum } from 'src/modules/order-association/order/enums/order.type.enum';

@Index('addressId', ['addressId'], {})
@Entity('companies')
export class Company {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'name', nullable: true, length: 255 })
    name: string;

    @Column('varchar', { name: 'displayName', nullable: true, length: 255 })
    displayName: string;

    @Column('text', { name: 'image', nullable: true })
    image: string;

    @Column('varchar', { name: 'backgroundColor', nullable: true, length: 10 })
    backgroundColor: string;

    @Column({ type: 'boolean', name: 'acceptTakeout', default: true })
    acceptTakeout: boolean;

    @Column({
        type: 'boolean',
        name: 'active',
        nullable: true,
        default: false,
    })
    active: boolean;

    @Column({ type: 'boolean', name: 'published', default: false })
    published: boolean;

    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;

    @Column('int', { name: 'addressId', nullable: true })
    addressId: number;

    @OneToMany(
        () => Category,
        categories => categories.company,
    )
    categories: Category[];

    @ManyToMany(
        () => CompanySection,
        companyTypes => companyTypes.companies,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    )
    @JoinTable({
        name: 'companies_to_sections',
        joinColumn: { name: 'companyId' },
        inverseJoinColumn: { name: 'companySectionId' },
    })
    sections: CompanySection[];

    @ManyToOne(
        () => Address,
        addresses => addresses.companies,
        {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn([{ name: 'addressId', referencedColumnName: 'id' }])
    address: Address;

    @OneToMany(
        () => CompanyMeta,
        companyMetas => companyMetas.company,
    )
    metas: CompanyMeta[];

    @OneToMany(
        () => CompanyPaymentMethod,
        companyPaymentMethods => companyPaymentMethods.company,
    )
    companyPaymentMethods: CompanyPaymentMethod[];

    @OneToMany(
        () => CompanyUser,
        companyUsers => companyUsers.company,
    )
    companyUsers: CompanyUser[];

    @ManyToMany(
        () => Coupon,
        coupon => coupon.companies,
    )
    coupons: Coupon[];

    @OneToMany(
        () => DeliveryArea,
        deliveryAreas => deliveryAreas.company,
    )
    deliveryAreas: DeliveryArea[];

    @OneToMany(
        () => PickUpArea,
        pickUpArea => pickUpArea.company,
    )
    pickUpAreas: PickUpArea[];

    @OneToMany(
        () => Order,
        orders => orders.company,
    )
    orders: Order[];

    @OneToMany(
        () => Product,
        products => products.company,
    )
    products: Product[];

    @OneToMany(
        () => Rating,
        ratings => ratings.company,
    )
    ratings: Rating[];

    isOpen?: boolean;

    nextOpen?: Date;

    nextClose?: Date;

    allowBuyClosed?: string;

    distance?: number;

    orderType?: OrderTypeEnum[];
}
