import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from './company.entity';

@ObjectType()
@Entity('company_types')
export class CompanySection {
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

    @Field()
    @Column('datetime', { name: 'createdAt' })
    createdAt: Date;

    @Field()
    @Column('datetime', { name: 'updatedAt' })
    updatedAt: Date;

    @Field(() => [Company])
    @OneToMany(
        () => Company,
        companies => companies.companyType,
    )
    companies: Company[];
}
