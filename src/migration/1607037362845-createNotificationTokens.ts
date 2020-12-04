import { DeepPartial } from '@nestjs-query/core';
import { NotificationToken } from 'src/modules/notification/entities/notification-token.entity';
import { NotificationTokenTypeEnum } from 'src/modules/notification/enums/notification-token-type.enum';
import { UserMeta } from 'src/modules/user-association/user-meta/entities/user.meta.entity';
import { IsNull, MigrationInterface, Not, QueryRunner } from 'typeorm';

export class createNotificationTokens1607037362845 implements MigrationInterface {
    name = 'createNotificationTokens1607037362845';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "CREATE TABLE `notification_tokens` (`id` int NOT NULL AUTO_INCREMENT, `type` enum ('mobile', 'browser') NOT NULL, `value` varchar(255) NOT NULL, `userId` int NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB",
        );
        await queryRunner.query(
            'ALTER TABLE `notification_tokens` ADD CONSTRAINT `FK_44a4ff581335d5aafa04223caa1` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
        );

        const metasRepository = queryRunner.connection.getRepository(UserMeta);
        const notificationRepository = queryRunner.connection.getRepository(NotificationToken);

        const browserMetas = await metasRepository.find({
            where: { key: 'notification_desktop_tokens', userId: Not(IsNull()) },
        });
        const mobileMetas = await metasRepository.find({
            where: { key: 'notification_tokens', userId: Not(IsNull()) },
        });

        const reduceMeta = (type: NotificationTokenTypeEnum) => (
            metas: DeepPartial<NotificationToken>[],
            meta: UserMeta,
        ) => {
            const tokens: string[] = JSON.parse(meta.value);
            const userMetas: DeepPartial<NotificationToken>[] = tokens.map(m => ({
                value: m,
                userId: meta.userId,
                type,
            }));

            return [...metas, ...userMetas];
        };

        const browserMetasTokens = browserMetas.reduce<DeepPartial<NotificationToken>[]>(
            reduceMeta(NotificationTokenTypeEnum.BROWSER),
            [],
        );
        const mobileMetasTokens = mobileMetas.reduce<DeepPartial<NotificationToken>[]>(
            reduceMeta(NotificationTokenTypeEnum.MOBILE),
            [],
        );

        await notificationRepository.insert([...browserMetasTokens, ...mobileMetasTokens]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `notification_tokens` DROP FOREIGN KEY `FK_44a4ff581335d5aafa04223caa1`');
        await queryRunner.query('DROP TABLE `notification_tokens`');
    }
}
