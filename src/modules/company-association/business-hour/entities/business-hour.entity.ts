import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from '../../company/entities/company.entity';

@Entity('business_hours')
export class BusinessHour {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    companyId: number;

    @Column('int')
    dayOfWeek: number;

    @Column('int')
    start: number;

    @Column('int')
    end: number;

    @ManyToOne(
        () => Company,
        company => company.businessHour,
        { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
    )
    @JoinColumn({ name: 'companyId', referencedColumnName: 'id' })
    company: Company;
}
