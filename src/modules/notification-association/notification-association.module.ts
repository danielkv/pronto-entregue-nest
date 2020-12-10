import { Global, Module } from '@nestjs/common';
import { NotificationModule } from './notification/notification.module';
import { NotificationReceiverGroupModule } from './notification-receiver-groups/notification-receiver.module';

@Global()
@Module({
    imports: [NotificationModule, NotificationReceiverGroupModule],
    exports: [NotificationModule, NotificationReceiverGroupModule],
})
export class NotificationAssociationModule {}
