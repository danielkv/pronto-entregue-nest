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
import { Company } from './company.entity';
import { User } from '../../../user/entities/user.entity';
import { Role } from '../../../user/entities/role.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Index('company_users_userId_companyId_unique', ['companyId', 'userId'], {
    unique: true,
})
@Index('userId', ['userId'], {})
@Index('roleId', ['roleId'], {})
@Entity('company_users')
export class CompanyUser {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
    id: number;

    @Field()
    @Column({
        type: 'boolean',
        name: 'active',
        nullable: true,
        default: true,
    })
    active: boolean | null;

    @Field()
    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;

    @Column('int', { name: 'companyId', nullable: true })
    companyId: number | null;

    @Column('int', { name: 'userId', nullable: true })
    userId: number | null;

    @Column('int', { name: 'roleId', nullable: true })
    roleId: number | null;

    @Field(() => Company)
    @ManyToOne(
        () => Company,
        companies => companies.companyUsers,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn([{ name: 'companyId', referencedColumnName: 'id' }])
    company: Company;

    @Field(() => User)
    @ManyToOne(
        () => User,
        users => users.companyUsers,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
    user: User;

    @Field(() => Role)
    @ManyToOne(
        () => Role,
        roles => roles.companyUsers,
        {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn([{ name: 'roleId', referencedColumnName: 'id' }])
    role: Role;
}
