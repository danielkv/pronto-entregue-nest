import { DeliveryMan } from 'src/modules/deliver-man/entities/delivery-man.entity';
import { NotificationReceiver } from 'src/modules/notification-association/notification-receiver-groups/entities/notification-receiver.entity';
import { User } from 'src/modules/user-association/user/entities/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class createDeliveryManTable1607714129872 implements MigrationInterface {
    name = 'createDeliveryManTable1607714129872';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'CREATE TABLE `delivery_men` (`id` int NOT NULL AUTO_INCREMENT, `userId` int NOT NULL, UNIQUE INDEX `IDX_d7424963ee1691d6ac5787c9d9` (`userId`), UNIQUE INDEX `REL_d7424963ee1691d6ac5787c9d9` (`userId`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
        );
        await queryRunner.query(
            'ALTER TABLE `delivery_men` ADD CONSTRAINT `FK_d7424963ee1691d6ac5787c9d96` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
        );

        const userRepository = queryRunner.connection.getRepository(User);
        const deliveryManRepository = queryRunner.connection.getRepository(DeliveryMan);
        const notificationRepository = queryRunner.connection.getRepository(NotificationReceiver);

        const users = await userRepository.find({ where: { role: 'deliveryMan' } });
        await deliveryManRepository.insert(users.map(user => ({ userId: user.id })));
        await notificationRepository.insert(users.map(user => ({ userId: user.id, groupId: 'deliveryMan' })));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `delivery_men` DROP FOREIGN KEY `FK_d7424963ee1691d6ac5787c9d96`');
        await queryRunner.query('DROP INDEX `REL_d7424963ee1691d6ac5787c9d9` ON `delivery_men`');
        await queryRunner.query('DROP INDEX `IDX_d7424963ee1691d6ac5787c9d9` ON `delivery_men`');
        await queryRunner.query('DROP TABLE `delivery_men`');
    }
}
