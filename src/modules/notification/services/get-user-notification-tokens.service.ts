import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { Injectable } from '@nestjs/common';
import { UserMetaDTO } from 'src/modules/user-association/user-meta/dtos/user.meta.dto';
import { UserMeta } from 'src/modules/user-association/user-meta/entities/user.meta.entity';
import { User } from 'src/modules/user-association/user/entities/user.entity';
import { NotificationTokenTypeEnum } from '../enums/notification-token-type.enum';
import { INotificationToken } from '../interfaces/notification-token.interface';

@Injectable()
export class GetUsersNotificationTokensService {
    /* constructor(@InjectQueryService(UserMetaDTO) private userMetaService: QueryService<UserMetaDTO>) {}

    async execute(userId: User['id'][], types: NotificationTokenTypeEnum[]): Promise<INotificationToken[]> {
        const metas = await this.userMetaService.query({ key: { in: types } });

        const notificationTokens = metas.reduce<INotificationToken[]>((notificationTokens, meta) => {
            notificationTokens.push(...this.convertMetaToTokens(meta));
            return notificationTokens;
        }, []);

        return notificationTokens;
    }

    private convertMetaToTokens(meta: UserMeta): INotificationToken[] {
        const tokens: string[] = JSON.parse(meta.value);

        return tokens.map(token => {
            return {
                type:
                    meta.key === NotificationTokenTypeEnum.MOBILE
                        ? NotificationTokenTypeEnum.MOBILE
                        : NotificationTokenTypeEnum.BROWSER,
                token,
            };
        });
    } */
}
