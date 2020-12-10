import { MigrationInterface, QueryRunner } from 'typeorm';

export class companyDeliveriesField1607635121392 implements MigrationInterface {
    name = 'companyDeliveriesField1607635121392';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `deliveries` ADD `companyId` int NOT NULL DEFAULT '9'");
        await queryRunner.query(
            'ALTER TABLE `deliveries` ADD CONSTRAINT `FK_a82b77cabaff600afe87cfc00c7` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
        );

        await queryRunner.query(
            'UPDATE deliveries SET companyId = (SELECT orders.companyId  FROM orders WHERE orders.id = deliveries.orderId) WHERE (SELECT orders.companyId  FROM orders WHERE orders.id = deliveries.orderId) IS NOT NULL',
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `deliveries` DROP FOREIGN KEY `FK_a82b77cabaff600afe87cfc00c7`');
        await queryRunner.query('ALTER TABLE `deliveries` DROP COLUMN `companyId`');
    }
}
