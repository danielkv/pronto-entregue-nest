import { User } from 'src/modules/user-association/user/entities/user.entity';
import { NotificationGroup } from '../../notification-receiver-groups/enums/notification-groups.enum';
import { NotificationTokenTypeEnum } from '../enums/notification-token-type.enum';

export type GroupReceiver = { name: NotificationGroup; id?: number | string };

export type INotificationReceivers =
    | {
          group: GroupReceiver;
          userIds?: User['id'][];
          type?: NotificationTokenTypeEnum[];
      }
    | {
          group?: GroupReceiver;
          userIds: User['id'][];
          type?: NotificationTokenTypeEnum[];
      };
