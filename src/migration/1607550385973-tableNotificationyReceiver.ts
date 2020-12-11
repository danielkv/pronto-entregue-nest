import { DeepPartial } from '@nestjs-query/core';
import { CompanyUser } from 'src/modules/company-association/company-user/entities/company.user.entity';
import { NotificationReceiver } from 'src/modules/notification-association/notification-receiver-groups/entities/notification-receiver.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class tableNotificationyReceiver1607550385973 implements MigrationInterface {
    name = 'tableNotificationyReceiver1607550385973';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'CREATE TABLE `notification_receivers` (`id` int NOT NULL AUTO_INCREMENT, `userId` int NOT NULL, `groupId` varchar(255) NOT NULL, `removed` tinyint NOT NULL DEFAULT 0, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB',
        );
        await queryRunner.query(
            'ALTER TABLE `notification_receivers` ADD CONSTRAINT `FK_ad95ee9b34a2c259e1c0f148aff` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
        );

        const companyUserRepository = queryRunner.connection.getRepository(CompanyUser);
        const companyReceiverRepository = queryRunner.connection.getRepository(NotificationReceiver);

        const companyUsers = await companyUserRepository.find();

        const newCompanyReceivers: DeepPartial<NotificationReceiver>[] = companyUsers.map(companyUser => {
            return {
                userId: companyUser.userId,
                groupId: `company:${companyUser.companyId}`,
            };
        });

        await companyReceiverRepository.insert(newCompanyReceivers);

        await queryRunner.query(
            "INSERT INTO pronto_entregue.notification_receivers (`userId`, `groupId`) (SELECT users.id, 'master' FROM users WHERE users.role = 'master');",
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE `notification_receivers` DROP FOREIGN KEY `FK_ad95ee9b34a2c259e1c0f148aff`',
        );
        await queryRunner.query('DROP TABLE `notification_receivers`');
    }
}
