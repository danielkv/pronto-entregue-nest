import { FilterableField } from '@nestjs-query/query-graphql';
import { ObjectType } from '@nestjs/graphql';
import { Entity } from 'typeorm';

@ObjectType('Setting')
@Entity('config')
export class ConfigDTO {
    @FilterableField()
    key: string | null;

    @FilterableField()
    value: string | null;
}
