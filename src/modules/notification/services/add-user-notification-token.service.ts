import { Injectable } from '@nestjs/common';
import { UserMetaInputDTO } from 'src/modules/user-association/user-meta/dtos/user.meta.input.dto';
import { GetUserMetaService } from 'src/modules/user-association/user-meta/services/get-user-meta.service';
import { SaveUserMetasService } from 'src/modules/user-association/user-meta/services/save-user-metas.service';
import { User } from 'src/modules/user-association/user/entities/user.entity';
import { NotificationTokenTypeEnum } from '../enums/notification-token-type.enum';
import { INotificationToken } from '../interfaces/notification-token.interface';

@Injectable()
export class AddUserNotificationTokenService {
    constructor(private getUserMetaService: GetUserMetaService, private saveUserMetaService: SaveUserMetasService) {}

    async execute(userId: User['id'], type: INotificationToken['type'], token: string): Promise<INotificationToken> {
        const key = NotificationTokenTypeEnum[type];
        const newMetaValue = [token];
        const notificationToken: INotificationToken = {
            type,
            token,
        };

        // check if tokens exists
        const tokenMeta = await this.getUserMetaService.execute(userId, key);
        if (tokenMeta) {
            const metaTokens: string[] = JSON.parse(tokenMeta.value);

            if (!metaTokens.find(metaToken => metaToken === token)) newMetaValue.push(...metaTokens);
            else return notificationToken;
        }

        // generate meta object
        const meta: UserMetaInputDTO = {
            userId,
            key,
            value: JSON.stringify(newMetaValue),
        };
        if (tokenMeta) meta.id = tokenMeta.id;

        // save
        this.saveUserMetaService.execute([meta]);

        // return token
        return notificationToken;
    }
}
