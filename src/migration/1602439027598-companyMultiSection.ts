import { MigrationInterface, QueryRunner } from 'typeorm';

export class companyMultiSection1602439027598 implements MigrationInterface {
    name = 'companyMultiSection1602439027598';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `companies` DROP FOREIGN KEY `FK_342cb27f23e38be60cce2035b10`');
        await queryRunner.query('DROP INDEX `IDX_38bce3ebd84aa545a418c6b6e9` ON `ratings`');
        await queryRunner.query('DROP INDEX `IDX_cbeaba1d3093f972e9b89fe504` ON `orders`');
        await queryRunner.query(
            'CREATE TABLE `companies_to_sections` (`companyId` int NOT NULL, `companySectionId` int NOT NULL, INDEX `IDX_6c39ee483e3b06f7169a993986` (`companyId`), INDEX `IDX_62ae83e65b25f7edc28236fe6a` (`companySectionId`), PRIMARY KEY (`companyId`, `companySectionId`)) ENGINE=InnoDB',
        );
        await queryRunner.query('ALTER TABLE `order_options` CHANGE `id` `id` int UNSIGNED NOT NULL AUTO_INCREMENT');
        await queryRunner.query('ALTER TABLE `order_option_groups` DROP FOREIGN KEY `FK_2d35f9d488137f53f6c0c76a9b1`');
        await queryRunner.query(
            'ALTER TABLE `order_option_groups` CHANGE `orderProductId` `orderProductId` int UNSIGNED NULL',
        );
        await queryRunner.query('ALTER TABLE `company_users` CHANGE `id` `id` int UNSIGNED NOT NULL AUTO_INCREMENT');
        await queryRunner.query(
            "ALTER TABLE `coupons` CHANGE `taxable` `taxable` decimal(10,2) NULL COMMENT 'Porcentagem do cupom que será pago pelo estabelecimento' DEFAULT 100",
        );
        await queryRunner.query('ALTER TABLE `coupons` CHANGE `minValue` `minValue` decimal(10,2) NULL DEFAULT 0');
        await queryRunner.query('ALTER TABLE `coupons` CHANGE `maxValue` `maxValue` decimal(10,2) NULL DEFAULT 0');
        await queryRunner.query(
            'ALTER TABLE `company_payment_methods` CHANGE `id` `id` int UNSIGNED NOT NULL AUTO_INCREMENT',
        );
        await queryRunner.query('ALTER TABLE `payment_methods` CHANGE `fee` `fee` decimal(10,2) NOT NULL DEFAULT 0');
        await queryRunner.query('ALTER TABLE `order_products` CHANGE `id` `id` int UNSIGNED NOT NULL AUTO_INCREMENT');
        await queryRunner.query(
            'ALTER TABLE `order_option_groups` ADD CONSTRAINT `FK_2d35f9d488137f53f6c0c76a9b1` FOREIGN KEY (`orderProductId`) REFERENCES `order_products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `companies_to_sections` ADD CONSTRAINT `FK_6c39ee483e3b06f7169a9939865` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE `companies_to_sections` ADD CONSTRAINT `FK_62ae83e65b25f7edc28236fe6a5` FOREIGN KEY (`companySectionId`) REFERENCES `company_types`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE `companies_to_sections` DROP FOREIGN KEY `FK_62ae83e65b25f7edc28236fe6a5`',
        );
        await queryRunner.query(
            'ALTER TABLE `companies_to_sections` DROP FOREIGN KEY `FK_6c39ee483e3b06f7169a9939865`',
        );
        await queryRunner.query('ALTER TABLE `order_option_groups` DROP FOREIGN KEY `FK_2d35f9d488137f53f6c0c76a9b1`');
        await queryRunner.query(
            'ALTER TABLE `order_products` CHANGE `id` `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT',
        );
        await queryRunner.query(
            "ALTER TABLE `payment_methods` CHANGE `fee` `fee` decimal(10,2) NOT NULL DEFAULT '0.00'",
        );
        await queryRunner.query(
            'ALTER TABLE `company_payment_methods` CHANGE `id` `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT',
        );
        await queryRunner.query("ALTER TABLE `coupons` CHANGE `maxValue` `maxValue` decimal(10,2) NULL DEFAULT '0.00'");
        await queryRunner.query("ALTER TABLE `coupons` CHANGE `minValue` `minValue` decimal(10,2) NULL DEFAULT '0.00'");
        await queryRunner.query(
            "ALTER TABLE `coupons` CHANGE `taxable` `taxable` decimal(10,2) NULL COMMENT 'Porcentagem do cupom que será pago pelo estabelecimento' DEFAULT '100.00'",
        );
        await queryRunner.query(
            'ALTER TABLE `company_users` CHANGE `id` `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT',
        );
        await queryRunner.query(
            'ALTER TABLE `order_option_groups` CHANGE `orderProductId` `orderProductId` int(10) UNSIGNED NULL',
        );
        await queryRunner.query(
            'ALTER TABLE `order_option_groups` ADD CONSTRAINT `FK_2d35f9d488137f53f6c0c76a9b1` FOREIGN KEY (`orderProductId`) REFERENCES `order_products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `order_options` CHANGE `id` `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT',
        );
        await queryRunner.query('DROP INDEX `IDX_62ae83e65b25f7edc28236fe6a` ON `companies_to_sections`');
        await queryRunner.query('DROP INDEX `IDX_6c39ee483e3b06f7169a993986` ON `companies_to_sections`');
        await queryRunner.query('DROP TABLE `companies_to_sections`');
        await queryRunner.query('CREATE UNIQUE INDEX `IDX_cbeaba1d3093f972e9b89fe504` ON `orders` (`creditHistoryId`)');
        await queryRunner.query('CREATE UNIQUE INDEX `IDX_38bce3ebd84aa545a418c6b6e9` ON `ratings` (`orderId`)');
        await queryRunner.query(
            'ALTER TABLE `companies` ADD CONSTRAINT `FK_342cb27f23e38be60cce2035b10` FOREIGN KEY (`companyTypeId`) REFERENCES `company_types`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
    }
}
