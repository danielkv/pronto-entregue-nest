import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { OrderProduct } from '../../../order-association/order-product/entities/order.product.entity';
import { Category } from '../../../category/entities/category.entity';
import { Company } from '../../../company-association/company/entities/company.entity';
import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { Coupon } from '../../../coupon/entities/coupon.entity';
import { User } from '../../../user-association/user/entities/user.entity';
import { OptionGroup } from '../../option-group/entities/option.group.entity';
import { Sale } from '../../sale/entities/sale.entity';
import { ProductTypeEnum } from '../enums/product-type.enum';

@ObjectType()
@Index('categoryId', ['categoryId'], {})
@Index('companyId', ['companyId'], {})
@Entity('products')
export class Product {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Field()
    @Column('varchar', { name: 'name', nullable: true, length: 255 })
    name: string | null;

    @Field()
    @Column('varchar', { name: 'description', nullable: true, length: 255 })
    description: string | null;

    @Field()
    @Column('varchar', { name: 'sku', nullable: true, length: 100 })
    sku: string | null;

    @Field()
    @Column('text', { name: 'image', nullable: true })
    image: string | null;

    @Field()
    @Column({
        type: 'boolean',
        name: 'active',
        nullable: true,
        default: true,
    })
    active: boolean | null;

    @Field()
    @Column({
        type: 'boolean',
        name: 'listed',
        nullable: true,
        comment: 'Show the product in product list and search',
        default: true,
    })
    listed: boolean | null;

    @Field(() => Int)
    @Column('int', { name: 'order', default: 0 })
    order: number;

    @Field(() => ProductTypeEnum)
    @Column('enum', {
        name: 'type',
        enum: ProductTypeEnum,
        default: ProductTypeEnum.INLINE,
    })
    type: ProductTypeEnum;

    @Field(() => Float)
    @Column('decimal', {
        name: 'fromPrice',
        nullable: true,
        precision: 10,
        scale: 2,
    })
    fromPrice: number | null;

    @Field(() => Float)
    @Column('decimal', {
        name: 'price',
        nullable: true,
        precision: 10,
        scale: 2,
    })
    price: number | null;

    @Field()
    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;

    @Column('int', { name: 'categoryId', nullable: true })
    categoryId: number | null;

    @Column('int', { name: 'companyId', nullable: true })
    companyId: number | null;

    @Field(() => Int, { nullable: true })
    @Column('int', { name: 'minDeliveryTime', nullable: true })
    minDeliveryTime: number | null;

    @Field()
    @Column({
        type: 'boolean',
        name: 'scheduleEnabled',
        nullable: true,
        default: false,
    })
    scheduleEnabled: boolean | null;

    @ManyToMany(
        () => Coupon,
        coupon => coupon.products,
    )
    coupons: Coupon[];

    @ManyToMany(
        () => User,
        user => user.favoriteProducts,
    )
    favoritedBy: User[];

    @OneToMany(
        () => OptionGroup,
        optionsGroups => optionsGroups.product,
        { cascade: true },
    )
    optionsGroups: OptionGroup[];

    @OneToMany(
        () => OrderProduct,
        orderProducts => orderProducts.productRelated,
    )
    orderProducts: OrderProduct[];

    @ManyToOne(
        () => Category,
        categories => categories.products,
        {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn([{ name: 'categoryId', referencedColumnName: 'id' }])
    category: Category;

    @ManyToOne(
        () => Company,
        companies => companies.products,
        {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn([{ name: 'companyId', referencedColumnName: 'id' }])
    company: Company;

    @OneToMany(
        () => Sale,
        sales => sales.product,
    )
    sales: Sale[];
}
