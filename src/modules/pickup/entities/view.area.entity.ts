import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from '../../company-association/company/entities/company.entity';

@ObjectType()
@Index('companyId', ['companyId'], {})
@Entity('view_areas')
export class ViewArea {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Field()
    @Column('varchar', { name: 'name', nullable: true, length: 255 })
    name: string | null;

    @Field()
    @Column('point', { name: 'center' })
    center: string;

    @Field(() => Float)
    @Column('float', { name: 'radius', precision: 12 })
    radius: number;

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
        company => company.viewAreas,
        {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn([{ name: 'companyId', referencedColumnName: 'id' }])
    company: Company;
}
