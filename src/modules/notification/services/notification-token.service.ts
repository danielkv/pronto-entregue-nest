import { DeepPartial } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Injectable } from '@nestjs/common';
import { NotificationToken } from '../entities/notification-token.entity';

@Injectable()
export class NotificationTokenService extends TypeOrmQueryService<NotificationToken> {
    async createOne(record: DeepPartial<NotificationToken>): Promise<NotificationToken> {
        // check if tokens exists
        const tokenMeta = await this.query({
            filter: { type: { eq: record.type }, userId: { eq: record.userId }, value: { eq: record.value } },
        });
        if (tokenMeta.length) return tokenMeta[0];

        // save
        const createdNotificationToken = await super.createOne(record);

        // return token
        return createdNotificationToken;
    }
}
