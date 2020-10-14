import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Company } from '../../company-association/company/entities/company.entity';
import { Product } from '../../product-association/product/entities/product.entity';

@ObjectType()
@Index('companyId', ['companyId'], {})
@Entity('categories')
export class Category {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Field()
    @Column('varchar', { name: 'name', nullable: true, length: 255 })
    name: string | null;

    @Field()
    @Column('varchar', { name: 'image', nullable: true, length: 255 })
    image: string | null;

    @Field()
    @Column('varchar', { name: 'description', nullable: true, length: 255 })
    description: string | null;

    @Field()
    @Column({
        type: 'boolean',
        name: 'active',
        nullable: true,
        default: true,
    })
    active: boolean | null;

    @Field(() => Int)
    @Column('int', { name: 'order', default: 0 })
    order: number;

    @Field()
    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;

    @Column('int', { name: 'companyId', nullable: true })
    companyId: number | null;

    @Field(() => Company)
    @ManyToOne(
        () => Company,
        companies => companies.categories,
        {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn([{ name: 'companyId', referencedColumnName: 'id' }])
    company: Company;

    @Field(() => [Product])
    @OneToMany(
        () => Product,
        products => products.category,
    )
    products: Product[];
}
