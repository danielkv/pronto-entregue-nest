import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Company } from '../../company/entities/company.entity';

@Entity('company_types')
export class CompanySection {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'name', nullable: true, length: 255 })
    name: string | null;

    @Column('varchar', { name: 'image', nullable: true, length: 255 })
    image: string | null;

    @Column('varchar', { name: 'description', nullable: true, length: 255 })
    description: string | null;

    @Column({
        type: 'boolean',
        name: 'active',
        nullable: true,
        default: true,
    })
    active: boolean | null;

    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;

    @ManyToMany(
        () => Company,
        companies => companies.sections,
    )
    companies: Company[];
}
