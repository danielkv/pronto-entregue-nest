import { Injectable } from '@nestjs/common';
import { UserMeta } from 'src/modules/user-association/user-meta/entities/user.meta.entity';
import { ListUserMetasService } from 'src/modules/user-association/user-meta/services/list-user-metas.service';
import { User } from 'src/modules/user-association/user/entities/user.entity';
import { NotificationTokenTypeEnum } from '../enums/notification-token-type.enum';
import { INotificationToken } from '../interfaces/notification-token.interface';

@Injectable()
export class GetUsersNotificationTokensService {
    constructor(private listUserMetasService: ListUserMetasService) {}

    async execute(userId: User['id'][], types: NotificationTokenTypeEnum[]): Promise<INotificationToken[]> {
        const metas = await this.listUserMetasService.execute({ userId, keys: types });

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
    }
}
