import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { CompanyUser } from '../../company-association/company/entities/company.user.entity';

@ObjectType()
@Entity('roles')
export class Role {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Field()
    @Column('varchar', { name: 'name', nullable: true, length: 255 })
    name: string | null;

    @Field()
    @Column('varchar', { name: 'displayName', nullable: true, length: 255 })
    displayName: string | null;

    @Field()
    @Column('text', { name: 'permissions', nullable: true })
    permissions: string | null;

    @Field()
    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;

    @Field(() => [CompanyUser])
    @OneToMany(
        () => CompanyUser,
        companyUsers => companyUsers.role,
    )
    companyUsers: CompanyUser[];
}
