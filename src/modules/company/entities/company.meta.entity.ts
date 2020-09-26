import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from './company.entity';

@ObjectType()
@Index('companyId', ['companyId'], {})
@Entity('company_metas')
export class CompanyMeta {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Field()
    @Column('varchar', {
        name: 'key',
        nullable: true,
        comment: 'phone | email | document | businessHours | address | ...',
        length: 255,
    })
    key: string | null;

    @Field()
    @Column('text', { name: 'value', nullable: true })
    value: string | null;

    @Field()
    @Column({
        type: 'boolean',
        name: 'unique',
        nullable: true,
        default: false,
    })
    unique: boolean | null;

    @Field()
    @Column('datetime', { name: 'createdAt' })
    createdAt: Date;

    @Field()
    @Column('datetime', { name: 'updatedAt' })
    updatedAt: Date;

    @Field()
    @Column('int', { name: 'companyId', nullable: true })
    companyId: number | null;

    @Field()
    @Column('varchar', { name: 'type', nullable: true, length: 255 })
    type: string | null;

    @Field()
    @ManyToOne(
        () => Company,
        companies => companies.companyMetas,
        {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn([{ name: 'companyId', referencedColumnName: 'id' }])
    company: Company;
}
