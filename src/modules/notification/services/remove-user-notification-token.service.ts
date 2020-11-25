import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/user-association/user/entities/user.entity';
import { NotificationTokenTypeEnum } from '../enums/notification-token-type.enum';
import { INotificationToken } from '../interfaces/notification-token.interface';

@Injectable()
export class RemoveUserNotificationTokenService {
    /* constructor(
        private getUserMetaService: GetUserMetaService,
        private updateUserMetasService: UpdateUserMetasService,
    ) {}

    async execute(userId: User['id'], type: INotificationToken['type'], token: string): Promise<INotificationToken> {
        const key = NotificationTokenTypeEnum[type];
        const notificationToken: INotificationToken = {
            type,
            token,
        };

        // check if tokens exists
        const tokenMeta = await this.getUserMetaService.execute(userId, key);
        if (!tokenMeta) return notificationToken;

        const newMetaValue: string[] = JSON.parse(tokenMeta.value);

        const tokenIndex = newMetaValue.findIndex(metaToken => metaToken === token);
        if (tokenIndex === -1) return notificationToken;

        newMetaValue.splice(tokenIndex, 1);

        // save
        await this.updateUserMetasService.execute(tokenMeta.id, { value: JSON.stringify(newMetaValue) });

        // return token
        return notificationToken;
    } */
}
