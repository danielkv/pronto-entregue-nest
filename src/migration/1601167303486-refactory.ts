import { MigrationInterface, QueryRunner } from 'typeorm';

export class refactory1601167303486 implements MigrationInterface {
    name = 'refactory1601167303486';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // fix
        await queryRunner.query(
            'DELETE FROM order_products WHERE order_products.orderId NOT IN (SELECT id FROM orders)',
        );

        // generated
        await queryRunner.query('ALTER TABLE `order_options` DROP FOREIGN KEY `order_options_ibfk_1`');
        await queryRunner.query('ALTER TABLE `order_options` DROP FOREIGN KEY `order_options_ibfk_2`');
        await queryRunner.query('ALTER TABLE `options` DROP FOREIGN KEY `options_ibfk_1`');
        await queryRunner.query('ALTER TABLE `options_groups` DROP FOREIGN KEY `options_groups_ibfk_1`');
        await queryRunner.query('ALTER TABLE `options_groups` DROP FOREIGN KEY `options_groups_ibfk_2`');
        await queryRunner.query('ALTER TABLE `order_option_groups` DROP FOREIGN KEY `order_option_groups_ibfk_1`');
        await queryRunner.query('ALTER TABLE `order_option_groups` DROP FOREIGN KEY `order_option_groups_ibfk_2`');
        await queryRunner.query('ALTER TABLE `company_users` DROP FOREIGN KEY `company_users_ibfk_1`');
        await queryRunner.query('ALTER TABLE `company_users` DROP FOREIGN KEY `company_users_ibfk_2`');
        await queryRunner.query('ALTER TABLE `company_users` DROP FOREIGN KEY `company_users_ibfk_3`');
        await queryRunner.query('ALTER TABLE `credit_balances` DROP FOREIGN KEY `credit_balances_ibfk_1`');
        await queryRunner.query('ALTER TABLE `credit_history` DROP FOREIGN KEY `credit_history_ibfk_1`');
        await queryRunner.query('ALTER TABLE `ratings` DROP FOREIGN KEY `ratings_ibfk_1`');
        await queryRunner.query('ALTER TABLE `ratings` DROP FOREIGN KEY `ratings_ibfk_2`');
        await queryRunner.query('ALTER TABLE `ratings` DROP FOREIGN KEY `ratings_ibfk_3`');
        await queryRunner.query('ALTER TABLE `user_metas` DROP FOREIGN KEY `user_metas_ibfk_1`');
        await queryRunner.query('ALTER TABLE `deliveries` DROP FOREIGN KEY `deliveries_ibfk_3`');
        await queryRunner.query('ALTER TABLE `deliveries` DROP FOREIGN KEY `deliveries_ibfk_4`');
        await queryRunner.query(
            'ALTER TABLE `company_payment_methods` DROP FOREIGN KEY `company_payment_methods_ibfk_1`',
        );
        await queryRunner.query(
            'ALTER TABLE `company_payment_methods` DROP FOREIGN KEY `company_payment_methods_ibfk_2`',
        );
        await queryRunner.query('ALTER TABLE `orders` DROP FOREIGN KEY `orders_ibfk_25`');
        await queryRunner.query('ALTER TABLE `orders` DROP FOREIGN KEY `orders_ibfk_26`');
        await queryRunner.query('ALTER TABLE `orders` DROP FOREIGN KEY `orders_ibfk_27`');
        await queryRunner.query('ALTER TABLE `orders` DROP FOREIGN KEY `orders_ibfk_28`');
        await queryRunner.query('ALTER TABLE `orders` DROP FOREIGN KEY `orders_ibfk_29`');
        await queryRunner.query('ALTER TABLE `order_products` DROP FOREIGN KEY `order_products_ibfk_1`');
        await queryRunner.query('ALTER TABLE `order_products` DROP FOREIGN KEY `order_products_ibfk_2`');
        await queryRunner.query('ALTER TABLE `order_products` DROP FOREIGN KEY `order_products_ibfk_3`');
        await queryRunner.query('ALTER TABLE `sales` DROP FOREIGN KEY `sales_ibfk_1`');
        await queryRunner.query('ALTER TABLE `products` DROP FOREIGN KEY `products_ibfk_3`');
        await queryRunner.query('ALTER TABLE `products` DROP FOREIGN KEY `products_ibfk_4`');
        await queryRunner.query('ALTER TABLE `categories` DROP FOREIGN KEY `categories_ibfk_1`');
        await queryRunner.query('ALTER TABLE `company_metas` DROP FOREIGN KEY `company_metas_ibfk_1`');
        await queryRunner.query('ALTER TABLE `delivery_areas` DROP FOREIGN KEY `delivery_areas_ibfk_1`');
        await queryRunner.query('ALTER TABLE `view_areas` DROP FOREIGN KEY `view_areas_ibfk_1`');
        await queryRunner.query('ALTER TABLE `companies` DROP FOREIGN KEY `companies_ibfk_1`');
        await queryRunner.query('ALTER TABLE `companies` DROP FOREIGN KEY `companies_ibfk_2`');
        await queryRunner.query('ALTER TABLE `coupon_companies` DROP FOREIGN KEY `coupon_companies_ibfk_1`');
        await queryRunner.query('ALTER TABLE `coupon_companies` DROP FOREIGN KEY `coupon_companies_ibfk_2`');
        await queryRunner.query('ALTER TABLE `coupon_products` DROP FOREIGN KEY `coupon_products_ibfk_1`');
        await queryRunner.query('ALTER TABLE `coupon_products` DROP FOREIGN KEY `coupon_products_ibfk_2`');
        await queryRunner.query('ALTER TABLE `coupon_users` DROP FOREIGN KEY `coupon_users_ibfk_1`');
        await queryRunner.query('ALTER TABLE `coupon_users` DROP FOREIGN KEY `coupon_users_ibfk_2`');
        await queryRunner.query('ALTER TABLE `favorite_products` DROP FOREIGN KEY `favorite_products_ibfk_1`');
        await queryRunner.query('ALTER TABLE `favorite_products` DROP FOREIGN KEY `favorite_products_ibfk_2`');
        await queryRunner.query('ALTER TABLE `user_addresses` DROP FOREIGN KEY `user_addresses_ibfk_1`');
        await queryRunner.query('ALTER TABLE `user_addresses` DROP FOREIGN KEY `user_addresses_ibfk_2`');
        await queryRunner.query('DROP INDEX `productId` ON `order_products`');
        await queryRunner.query('DROP INDEX `companyId` ON `coupon_companies`');
        await queryRunner.query('DROP INDEX `productId` ON `coupon_products`');
        await queryRunner.query('DROP INDEX `userId` ON `coupon_users`');
        await queryRunner.query('DROP INDEX `productId` ON `favorite_products`');
        await queryRunner.query('DROP INDEX `addressId` ON `user_addresses`');
        await queryRunner.query('ALTER TABLE `order_products` DROP COLUMN `productId`');
        await queryRunner.query('ALTER TABLE `coupon_companies` DROP COLUMN `createdAt`');
        await queryRunner.query('ALTER TABLE `coupon_companies` DROP COLUMN `updatedAt`');
        await queryRunner.query('ALTER TABLE `coupon_products` DROP COLUMN `createdAt`');
        await queryRunner.query('ALTER TABLE `coupon_products` DROP COLUMN `updatedAt`');
        await queryRunner.query('ALTER TABLE `coupon_users` DROP COLUMN `createdAt`');
        await queryRunner.query('ALTER TABLE `coupon_users` DROP COLUMN `updatedAt`');
        await queryRunner.query('ALTER TABLE `favorite_products` DROP COLUMN `createdAt`');
        await queryRunner.query('ALTER TABLE `favorite_products` DROP COLUMN `updatedAt`');
        await queryRunner.query('ALTER TABLE `user_addresses` DROP COLUMN `createdAt`');
        await queryRunner.query('ALTER TABLE `user_addresses` DROP COLUMN `updatedAt`');
        await queryRunner.query('ALTER TABLE `order_options` CHANGE `id` `id` int UNSIGNED NOT NULL AUTO_INCREMENT');
        await queryRunner.query('ALTER TABLE `options` CHANGE `active` `active` tinyint NULL DEFAULT 1');
        await queryRunner.query('ALTER TABLE `options` CHANGE `removed` `removed` tinyint NOT NULL DEFAULT 0');
        await queryRunner.query('ALTER TABLE `options_groups` CHANGE `active` `active` tinyint NULL DEFAULT 1');
        await queryRunner.query('ALTER TABLE `options_groups` CHANGE `removed` `removed` tinyint NOT NULL DEFAULT 0');
        await queryRunner.query(
            'ALTER TABLE `options_groups` ADD UNIQUE INDEX `IDX_3aecc6d707a2e8787b82bbc707` (`maxSelectRestrain`)',
        );
        await queryRunner.query(
            'ALTER TABLE `order_option_groups` CHANGE `orderProductId` `orderProductId` int UNSIGNED NULL',
        );
        await queryRunner.query('ALTER TABLE `company_users` CHANGE `id` `id` int UNSIGNED NOT NULL AUTO_INCREMENT');
        await queryRunner.query('ALTER TABLE `company_users` CHANGE `active` `active` tinyint NULL DEFAULT 1');
        await queryRunner.query(
            'ALTER TABLE `credit_balances` ADD UNIQUE INDEX `IDX_7f8103cfe175c66f1e5e8acfe2` (`userId`)',
        );
        await queryRunner.query('ALTER TABLE `ratings` CHANGE `hidden` `hidden` tinyint NULL DEFAULT 1');
        await queryRunner.query('ALTER TABLE `user_metas` CHANGE `unique` `unique` tinyint NULL DEFAULT 0');
        await queryRunner.query(
            "ALTER TABLE `coupons` CHANGE `masterOnly` `masterOnly` tinyint NULL COMMENT 'Se verdadeiro, apenas usuário master consegue alterar' DEFAULT 0",
        );
        await queryRunner.query(
            "ALTER TABLE `coupons` CHANGE `onlyFirstPurchases` `onlyFirstPurchases` tinyint NULL COMMENT 'Se verdadeiro, apenas válido apenas para primeira compra de cada usuário' DEFAULT 0",
        );
        await queryRunner.query(
            "ALTER TABLE `coupons` CHANGE `featured` `featured` tinyint NULL COMMENT 'Se verdadeiro, usuário pode pegar cupom na home do app' DEFAULT 0",
        );
        await queryRunner.query('ALTER TABLE `coupons` CHANGE `active` `active` tinyint NULL DEFAULT 1');
        await queryRunner.query(
            "ALTER TABLE `coupons` CHANGE `taxable` `taxable` decimal(10,2) NULL COMMENT 'Porcentagem do cupom que será pago pelo estabelecimento' DEFAULT 100",
        );
        await queryRunner.query('ALTER TABLE `coupons` CHANGE `minValue` `minValue` decimal(10,2) NULL DEFAULT 0');
        await queryRunner.query('ALTER TABLE `coupons` CHANGE `maxValue` `maxValue` decimal(10,2) NULL DEFAULT 0');
        await queryRunner.query(
            'ALTER TABLE `coupons` CHANGE `freeDelivery` `freeDelivery` tinyint NOT NULL DEFAULT 0',
        );
        await queryRunner.query('ALTER TABLE `users` CHANGE `active` `active` tinyint NULL DEFAULT 1');
        await queryRunner.query(
            'ALTER TABLE `company_payment_methods` CHANGE `id` `id` int UNSIGNED NOT NULL AUTO_INCREMENT',
        );
        await queryRunner.query('ALTER TABLE `payment_methods` CHANGE `order` `order` int NOT NULL DEFAULT 0');
        await queryRunner.query('ALTER TABLE `payment_methods` CHANGE `fee` `fee` decimal(10,2) NOT NULL DEFAULT 0');
        await queryRunner.query('ALTER TABLE `payment_methods` CHANGE `active` `active` tinyint NOT NULL DEFAULT 1');
        await queryRunner.query('ALTER TABLE `order_products` CHANGE `id` `id` int UNSIGNED NOT NULL AUTO_INCREMENT');
        await queryRunner.query('ALTER TABLE `sales` CHANGE `active` `active` tinyint NOT NULL DEFAULT 1');
        await queryRunner.query('ALTER TABLE `sales` CHANGE `removed` `removed` tinyint NOT NULL DEFAULT 0');
        await queryRunner.query('ALTER TABLE `products` CHANGE `active` `active` tinyint NULL DEFAULT 1');
        await queryRunner.query(
            "ALTER TABLE `products` CHANGE `listed` `listed` tinyint NULL COMMENT 'Show the product in product list and search' DEFAULT 1",
        );
        await queryRunner.query(
            'ALTER TABLE `products` CHANGE `scheduleEnabled` `scheduleEnabled` tinyint NULL DEFAULT 0',
        );
        await queryRunner.query('ALTER TABLE `categories` CHANGE `active` `active` tinyint NULL DEFAULT 1');
        await queryRunner.query('ALTER TABLE `company_types` CHANGE `active` `active` tinyint NULL DEFAULT 1');
        await queryRunner.query('ALTER TABLE `company_metas` CHANGE `unique` `unique` tinyint NULL DEFAULT 0');
        await queryRunner.query('ALTER TABLE `delivery_areas` CHANGE `active` `active` tinyint NULL DEFAULT 1');
        await queryRunner.query('ALTER TABLE `view_areas` CHANGE `active` `active` tinyint NULL DEFAULT 1');
        await queryRunner.query(
            'ALTER TABLE `companies` CHANGE `acceptTakeout` `acceptTakeout` tinyint NOT NULL DEFAULT 1',
        );
        await queryRunner.query('ALTER TABLE `companies` CHANGE `active` `active` tinyint NULL DEFAULT 0');
        await queryRunner.query('ALTER TABLE `companies` CHANGE `published` `published` tinyint NOT NULL DEFAULT 0');
        await queryRunner.query('ALTER TABLE `favorite_products` CHANGE `userId` `userId` int NOT NULL');
        await queryRunner.query('ALTER TABLE `favorite_products` CHANGE `productId` `productId` int NOT NULL');
        await queryRunner.query('ALTER TABLE `user_addresses` CHANGE `userId` `userId` int NOT NULL');
        await queryRunner.query('ALTER TABLE `user_addresses` CHANGE `addressId` `addressId` int NOT NULL');
        await queryRunner.query(
            'CREATE UNIQUE INDEX `REL_3aecc6d707a2e8787b82bbc707` ON `options_groups` (`maxSelectRestrain`)',
        );
        await queryRunner.query('CREATE UNIQUE INDEX `REL_7f8103cfe175c66f1e5e8acfe2` ON `credit_balances` (`userId`)');
        await queryRunner.query('CREATE UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users` (`email`)');
        await queryRunner.query('CREATE INDEX `IDX_4b6a4884f5c7291d652bf95539` ON `coupon_companies` (`couponId`)');
        await queryRunner.query('CREATE INDEX `IDX_896186ddfb5aa38f3606492d3a` ON `coupon_companies` (`companyId`)');
        await queryRunner.query('CREATE INDEX `IDX_32d7f809acaa65ddcaf7eb22f3` ON `coupon_products` (`couponId`)');
        await queryRunner.query('CREATE INDEX `IDX_d37ece730758316fcc06d20ca3` ON `coupon_products` (`productId`)');
        await queryRunner.query('CREATE INDEX `IDX_f0b0ea9f550e1fd439ca459ecb` ON `coupon_users` (`couponId`)');
        await queryRunner.query('CREATE INDEX `IDX_a79deee063e7500c19cb23c0e9` ON `coupon_users` (`userId`)');
        await queryRunner.query('CREATE INDEX `IDX_393984c0bf9c461d0171360f73` ON `favorite_products` (`userId`)');
        await queryRunner.query('CREATE INDEX `IDX_aec1e29e9ebed0d27e185c4896` ON `favorite_products` (`productId`)');
        await queryRunner.query('CREATE INDEX `IDX_781afdedafe920f331f6229cb6` ON `user_addresses` (`userId`)');
        await queryRunner.query('CREATE INDEX `IDX_fa6da87159415a34ef76d14f72` ON `user_addresses` (`addressId`)');
        await queryRunner.query(
            'ALTER TABLE `order_options` ADD CONSTRAINT `FK_f87d8aaf729cd701be0630ab9d7` FOREIGN KEY (`orderOptionsGroupId`) REFERENCES `order_option_groups`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `order_options` ADD CONSTRAINT `FK_ae3e162e5d4a7bbef8270924d66` FOREIGN KEY (`optionRelatedId`) REFERENCES `options`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `options` ADD CONSTRAINT `FK_693536a026dac7ded111a40d52b` FOREIGN KEY (`optionsGroupId`) REFERENCES `options_groups`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `options_groups` ADD CONSTRAINT `FK_bf72d679755159292984b730288` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `options_groups` ADD CONSTRAINT `FK_3aecc6d707a2e8787b82bbc707e` FOREIGN KEY (`maxSelectRestrain`) REFERENCES `options_groups`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `order_option_groups` ADD CONSTRAINT `FK_2d35f9d488137f53f6c0c76a9b1` FOREIGN KEY (`orderProductId`) REFERENCES `order_products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `order_option_groups` ADD CONSTRAINT `FK_1a6cfcb48db2eefddd246586b55` FOREIGN KEY (`optionsGroupRelatedId`) REFERENCES `options_groups`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `company_users` ADD CONSTRAINT `FK_f48efdd06dd9b999ae40c3c96a6` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `company_users` ADD CONSTRAINT `FK_9313a9760bacf83c51e9232c3c3` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `company_users` ADD CONSTRAINT `FK_380c62ffe8112dadf9b5709beee` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `credit_balances` ADD CONSTRAINT `FK_7f8103cfe175c66f1e5e8acfe23` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `credit_history` ADD CONSTRAINT `FK_7c689c904a5dadd63126a5c948f` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `ratings` ADD CONSTRAINT `FK_026a9f41a80ac181cd8ead10b13` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `ratings` ADD CONSTRAINT `FK_38bce3ebd84aa545a418c6b6e9c` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `ratings` ADD CONSTRAINT `FK_4d0b0e3a4c4af854d225154ba40` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `user_metas` ADD CONSTRAINT `FK_eccc6b4c4b311f38fd4e84d7290` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `deliveries` ADD CONSTRAINT `FK_f7433e3639e213f901e22cf8640` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `deliveries` ADD CONSTRAINT `FK_c6135e6bed9c4309abfcdaf9569` FOREIGN KEY (`deliveryManId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `company_payment_methods` ADD CONSTRAINT `FK_d167c7a5fa7e321ac698cbbc67d` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `company_payment_methods` ADD CONSTRAINT `FK_50140b197f6a47698d463b4b3aa` FOREIGN KEY (`paymentMethodId`) REFERENCES `payment_methods`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `orders` ADD CONSTRAINT `FK_151b79a83ba240b0cb31b2302d1` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `orders` ADD CONSTRAINT `FK_b6fe899d5ca4a3f5925463990d1` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `orders` ADD CONSTRAINT `FK_c137e0afcc291b9135d3e0c3d4e` FOREIGN KEY (`paymentMethodId`) REFERENCES `payment_methods`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `orders` ADD CONSTRAINT `FK_cbeaba1d3093f972e9b89fe5042` FOREIGN KEY (`creditHistoryId`) REFERENCES `credit_history`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `orders` ADD CONSTRAINT `FK_c26db6c65929ecfeab91073e80c` FOREIGN KEY (`couponId`) REFERENCES `coupons`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `order_products` ADD CONSTRAINT `FK_28b66449cf7cd76444378ad4e92` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `order_products` ADD CONSTRAINT `FK_24388ec1004228b4745d21d547b` FOREIGN KEY (`productRelatedId`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `sales` ADD CONSTRAINT `FK_58de77cc0543589490a33558b8e` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `products` ADD CONSTRAINT `FK_ff56834e735fa78a15d0cf21926` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `products` ADD CONSTRAINT `FK_47942e65af8e4235d4045515f05` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `categories` ADD CONSTRAINT `FK_92d9e96e1be5a0b3e94fddb892a` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `company_metas` ADD CONSTRAINT `FK_fc84d5c271e0875e5dfcc9327c7` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `delivery_areas` ADD CONSTRAINT `FK_34df3bf6125b3ca45de2d4b2fb8` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `view_areas` ADD CONSTRAINT `FK_1eff24e640f0ee0f20e1a3a5c87` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `companies` ADD CONSTRAINT `FK_342cb27f23e38be60cce2035b10` FOREIGN KEY (`companyTypeId`) REFERENCES `company_types`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `companies` ADD CONSTRAINT `FK_2bb6583d4cf35554e19694c8a9b` FOREIGN KEY (`addressId`) REFERENCES `addresses`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `coupon_companies` ADD CONSTRAINT `FK_4b6a4884f5c7291d652bf955398` FOREIGN KEY (`couponId`) REFERENCES `coupons`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE `coupon_companies` ADD CONSTRAINT `FK_896186ddfb5aa38f3606492d3a8` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE `coupon_products` ADD CONSTRAINT `FK_32d7f809acaa65ddcaf7eb22f37` FOREIGN KEY (`couponId`) REFERENCES `coupons`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE `coupon_products` ADD CONSTRAINT `FK_d37ece730758316fcc06d20ca3d` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE `coupon_users` ADD CONSTRAINT `FK_f0b0ea9f550e1fd439ca459ecb0` FOREIGN KEY (`couponId`) REFERENCES `coupons`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE `coupon_users` ADD CONSTRAINT `FK_a79deee063e7500c19cb23c0e95` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE `favorite_products` ADD CONSTRAINT `FK_393984c0bf9c461d0171360f737` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE `favorite_products` ADD CONSTRAINT `FK_aec1e29e9ebed0d27e185c4896e` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE `user_addresses` ADD CONSTRAINT `FK_781afdedafe920f331f6229cb62` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
        );
        await queryRunner.query(
            'ALTER TABLE `user_addresses` ADD CONSTRAINT `FK_fa6da87159415a34ef76d14f729` FOREIGN KEY (`addressId`) REFERENCES `addresses`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `user_addresses` DROP FOREIGN KEY `FK_fa6da87159415a34ef76d14f729`');
        await queryRunner.query('ALTER TABLE `user_addresses` DROP FOREIGN KEY `FK_781afdedafe920f331f6229cb62`');
        await queryRunner.query('ALTER TABLE `favorite_products` DROP FOREIGN KEY `FK_aec1e29e9ebed0d27e185c4896e`');
        await queryRunner.query('ALTER TABLE `favorite_products` DROP FOREIGN KEY `FK_393984c0bf9c461d0171360f737`');
        await queryRunner.query('ALTER TABLE `coupon_users` DROP FOREIGN KEY `FK_a79deee063e7500c19cb23c0e95`');
        await queryRunner.query('ALTER TABLE `coupon_users` DROP FOREIGN KEY `FK_f0b0ea9f550e1fd439ca459ecb0`');
        await queryRunner.query('ALTER TABLE `coupon_products` DROP FOREIGN KEY `FK_d37ece730758316fcc06d20ca3d`');
        await queryRunner.query('ALTER TABLE `coupon_products` DROP FOREIGN KEY `FK_32d7f809acaa65ddcaf7eb22f37`');
        await queryRunner.query('ALTER TABLE `coupon_companies` DROP FOREIGN KEY `FK_896186ddfb5aa38f3606492d3a8`');
        await queryRunner.query('ALTER TABLE `coupon_companies` DROP FOREIGN KEY `FK_4b6a4884f5c7291d652bf955398`');
        await queryRunner.query('ALTER TABLE `companies` DROP FOREIGN KEY `FK_2bb6583d4cf35554e19694c8a9b`');
        await queryRunner.query('ALTER TABLE `companies` DROP FOREIGN KEY `FK_342cb27f23e38be60cce2035b10`');
        await queryRunner.query('ALTER TABLE `view_areas` DROP FOREIGN KEY `FK_1eff24e640f0ee0f20e1a3a5c87`');
        await queryRunner.query('ALTER TABLE `delivery_areas` DROP FOREIGN KEY `FK_34df3bf6125b3ca45de2d4b2fb8`');
        await queryRunner.query('ALTER TABLE `company_metas` DROP FOREIGN KEY `FK_fc84d5c271e0875e5dfcc9327c7`');
        await queryRunner.query('ALTER TABLE `categories` DROP FOREIGN KEY `FK_92d9e96e1be5a0b3e94fddb892a`');
        await queryRunner.query('ALTER TABLE `products` DROP FOREIGN KEY `FK_47942e65af8e4235d4045515f05`');
        await queryRunner.query('ALTER TABLE `products` DROP FOREIGN KEY `FK_ff56834e735fa78a15d0cf21926`');
        await queryRunner.query('ALTER TABLE `sales` DROP FOREIGN KEY `FK_58de77cc0543589490a33558b8e`');
        await queryRunner.query('ALTER TABLE `order_products` DROP FOREIGN KEY `FK_24388ec1004228b4745d21d547b`');
        await queryRunner.query('ALTER TABLE `order_products` DROP FOREIGN KEY `FK_28b66449cf7cd76444378ad4e92`');
        await queryRunner.query('ALTER TABLE `orders` DROP FOREIGN KEY `FK_c26db6c65929ecfeab91073e80c`');
        await queryRunner.query('ALTER TABLE `orders` DROP FOREIGN KEY `FK_cbeaba1d3093f972e9b89fe5042`');
        await queryRunner.query('ALTER TABLE `orders` DROP FOREIGN KEY `FK_c137e0afcc291b9135d3e0c3d4e`');
        await queryRunner.query('ALTER TABLE `orders` DROP FOREIGN KEY `FK_b6fe899d5ca4a3f5925463990d1`');
        await queryRunner.query('ALTER TABLE `orders` DROP FOREIGN KEY `FK_151b79a83ba240b0cb31b2302d1`');
        await queryRunner.query(
            'ALTER TABLE `company_payment_methods` DROP FOREIGN KEY `FK_50140b197f6a47698d463b4b3aa`',
        );
        await queryRunner.query(
            'ALTER TABLE `company_payment_methods` DROP FOREIGN KEY `FK_d167c7a5fa7e321ac698cbbc67d`',
        );
        await queryRunner.query('ALTER TABLE `deliveries` DROP FOREIGN KEY `FK_c6135e6bed9c4309abfcdaf9569`');
        await queryRunner.query('ALTER TABLE `deliveries` DROP FOREIGN KEY `FK_f7433e3639e213f901e22cf8640`');
        await queryRunner.query('ALTER TABLE `user_metas` DROP FOREIGN KEY `FK_eccc6b4c4b311f38fd4e84d7290`');
        await queryRunner.query('ALTER TABLE `ratings` DROP FOREIGN KEY `FK_4d0b0e3a4c4af854d225154ba40`');
        await queryRunner.query('ALTER TABLE `ratings` DROP FOREIGN KEY `FK_38bce3ebd84aa545a418c6b6e9c`');
        await queryRunner.query('ALTER TABLE `ratings` DROP FOREIGN KEY `FK_026a9f41a80ac181cd8ead10b13`');
        await queryRunner.query('ALTER TABLE `credit_history` DROP FOREIGN KEY `FK_7c689c904a5dadd63126a5c948f`');
        await queryRunner.query('ALTER TABLE `credit_balances` DROP FOREIGN KEY `FK_7f8103cfe175c66f1e5e8acfe23`');
        await queryRunner.query('ALTER TABLE `company_users` DROP FOREIGN KEY `FK_380c62ffe8112dadf9b5709beee`');
        await queryRunner.query('ALTER TABLE `company_users` DROP FOREIGN KEY `FK_9313a9760bacf83c51e9232c3c3`');
        await queryRunner.query('ALTER TABLE `company_users` DROP FOREIGN KEY `FK_f48efdd06dd9b999ae40c3c96a6`');
        await queryRunner.query('ALTER TABLE `order_option_groups` DROP FOREIGN KEY `FK_1a6cfcb48db2eefddd246586b55`');
        await queryRunner.query('ALTER TABLE `order_option_groups` DROP FOREIGN KEY `FK_2d35f9d488137f53f6c0c76a9b1`');
        await queryRunner.query('ALTER TABLE `options_groups` DROP FOREIGN KEY `FK_3aecc6d707a2e8787b82bbc707e`');
        await queryRunner.query('ALTER TABLE `options_groups` DROP FOREIGN KEY `FK_bf72d679755159292984b730288`');
        await queryRunner.query('ALTER TABLE `options` DROP FOREIGN KEY `FK_693536a026dac7ded111a40d52b`');
        await queryRunner.query('ALTER TABLE `order_options` DROP FOREIGN KEY `FK_ae3e162e5d4a7bbef8270924d66`');
        await queryRunner.query('ALTER TABLE `order_options` DROP FOREIGN KEY `FK_f87d8aaf729cd701be0630ab9d7`');
        await queryRunner.query('DROP INDEX `IDX_fa6da87159415a34ef76d14f72` ON `user_addresses`');
        await queryRunner.query('DROP INDEX `IDX_781afdedafe920f331f6229cb6` ON `user_addresses`');
        await queryRunner.query('DROP INDEX `IDX_aec1e29e9ebed0d27e185c4896` ON `favorite_products`');
        await queryRunner.query('DROP INDEX `IDX_393984c0bf9c461d0171360f73` ON `favorite_products`');
        await queryRunner.query('DROP INDEX `IDX_a79deee063e7500c19cb23c0e9` ON `coupon_users`');
        await queryRunner.query('DROP INDEX `IDX_f0b0ea9f550e1fd439ca459ecb` ON `coupon_users`');
        await queryRunner.query('DROP INDEX `IDX_d37ece730758316fcc06d20ca3` ON `coupon_products`');
        await queryRunner.query('DROP INDEX `IDX_32d7f809acaa65ddcaf7eb22f3` ON `coupon_products`');
        await queryRunner.query('DROP INDEX `IDX_896186ddfb5aa38f3606492d3a` ON `coupon_companies`');
        await queryRunner.query('DROP INDEX `IDX_4b6a4884f5c7291d652bf95539` ON `coupon_companies`');
        await queryRunner.query('DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`');
        await queryRunner.query('DROP INDEX `REL_7f8103cfe175c66f1e5e8acfe2` ON `credit_balances`');
        await queryRunner.query('DROP INDEX `REL_3aecc6d707a2e8787b82bbc707` ON `options_groups`');
        await queryRunner.query("ALTER TABLE `user_addresses` CHANGE `addressId` `addressId` int NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `user_addresses` CHANGE `userId` `userId` int NOT NULL DEFAULT '0'");
        await queryRunner.query(
            "ALTER TABLE `favorite_products` CHANGE `productId` `productId` int NOT NULL DEFAULT '0'",
        );
        await queryRunner.query("ALTER TABLE `favorite_products` CHANGE `userId` `userId` int NOT NULL DEFAULT '0'");
        await queryRunner.query(
            "ALTER TABLE `companies` CHANGE `published` `published` tinyint(1) NOT NULL DEFAULT '0'",
        );
        await queryRunner.query("ALTER TABLE `companies` CHANGE `active` `active` tinyint(1) NULL DEFAULT '0'");
        await queryRunner.query(
            "ALTER TABLE `companies` CHANGE `acceptTakeout` `acceptTakeout` tinyint(1) NOT NULL DEFAULT '1'",
        );
        await queryRunner.query("ALTER TABLE `view_areas` CHANGE `active` `active` tinyint(1) NULL DEFAULT '1'");
        await queryRunner.query("ALTER TABLE `delivery_areas` CHANGE `active` `active` tinyint(1) NULL DEFAULT '1'");
        await queryRunner.query("ALTER TABLE `company_metas` CHANGE `unique` `unique` tinyint(1) NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `company_types` CHANGE `active` `active` tinyint(1) NULL DEFAULT '1'");
        await queryRunner.query("ALTER TABLE `categories` CHANGE `active` `active` tinyint(1) NULL DEFAULT '1'");
        await queryRunner.query(
            "ALTER TABLE `products` CHANGE `scheduleEnabled` `scheduleEnabled` tinyint(1) NULL DEFAULT '0'",
        );
        await queryRunner.query(
            "ALTER TABLE `products` CHANGE `listed` `listed` tinyint(1) NULL COMMENT 'Show the product in product list and search' DEFAULT '1'",
        );
        await queryRunner.query("ALTER TABLE `products` CHANGE `active` `active` tinyint(1) NULL DEFAULT '1'");
        await queryRunner.query("ALTER TABLE `sales` CHANGE `removed` `removed` tinyint(1) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `sales` CHANGE `active` `active` tinyint(1) NOT NULL DEFAULT '1'");
        await queryRunner.query(
            'ALTER TABLE `order_products` CHANGE `id` `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT',
        );
        await queryRunner.query(
            "ALTER TABLE `payment_methods` CHANGE `active` `active` tinyint(1) NOT NULL DEFAULT '1'",
        );
        await queryRunner.query(
            "ALTER TABLE `payment_methods` CHANGE `fee` `fee` decimal(10,2) NOT NULL DEFAULT '0.00'",
        );
        await queryRunner.query("ALTER TABLE `payment_methods` CHANGE `order` `order` int(2) NOT NULL DEFAULT '0'");
        await queryRunner.query(
            'ALTER TABLE `company_payment_methods` CHANGE `id` `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT',
        );
        await queryRunner.query("ALTER TABLE `users` CHANGE `active` `active` tinyint(1) NULL DEFAULT '1'");
        await queryRunner.query(
            "ALTER TABLE `coupons` CHANGE `freeDelivery` `freeDelivery` tinyint(1) NOT NULL DEFAULT '0'",
        );
        await queryRunner.query("ALTER TABLE `coupons` CHANGE `maxValue` `maxValue` decimal(10,2) NULL DEFAULT '0.00'");
        await queryRunner.query("ALTER TABLE `coupons` CHANGE `minValue` `minValue` decimal(10,2) NULL DEFAULT '0.00'");
        await queryRunner.query(
            "ALTER TABLE `coupons` CHANGE `taxable` `taxable` decimal(10,2) NULL COMMENT 'Porcentagem do cupom que será pago pelo estabelecimento' DEFAULT '100.00'",
        );
        await queryRunner.query("ALTER TABLE `coupons` CHANGE `active` `active` tinyint(1) NULL DEFAULT '1'");
        await queryRunner.query(
            "ALTER TABLE `coupons` CHANGE `featured` `featured` tinyint(1) NULL COMMENT 'Se verdadeiro, usuário pode pegar cupom na home do app' DEFAULT '0'",
        );
        await queryRunner.query(
            "ALTER TABLE `coupons` CHANGE `onlyFirstPurchases` `onlyFirstPurchases` tinyint(1) NULL COMMENT 'Se verdadeiro, apenas válido apenas para primeira compra de cada usuário' DEFAULT '0'",
        );
        await queryRunner.query(
            "ALTER TABLE `coupons` CHANGE `masterOnly` `masterOnly` tinyint(1) NULL COMMENT 'Se verdadeiro, apenas usuário master consegue alterar' DEFAULT '0'",
        );
        await queryRunner.query("ALTER TABLE `user_metas` CHANGE `unique` `unique` tinyint(1) NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `ratings` CHANGE `hidden` `hidden` tinyint(1) NULL DEFAULT '1'");
        await queryRunner.query('ALTER TABLE `credit_balances` DROP INDEX `IDX_7f8103cfe175c66f1e5e8acfe2`');
        await queryRunner.query("ALTER TABLE `company_users` CHANGE `active` `active` tinyint(1) NULL DEFAULT '1'");
        await queryRunner.query(
            'ALTER TABLE `company_users` CHANGE `id` `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT',
        );
        await queryRunner.query(
            'ALTER TABLE `order_option_groups` CHANGE `orderProductId` `orderProductId` int(10) UNSIGNED NULL',
        );
        await queryRunner.query('ALTER TABLE `options_groups` DROP INDEX `IDX_3aecc6d707a2e8787b82bbc707`');
        await queryRunner.query(
            "ALTER TABLE `options_groups` CHANGE `removed` `removed` tinyint(1) NOT NULL DEFAULT '0'",
        );
        await queryRunner.query("ALTER TABLE `options_groups` CHANGE `active` `active` tinyint(1) NULL DEFAULT '1'");
        await queryRunner.query("ALTER TABLE `options` CHANGE `removed` `removed` tinyint(1) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `options` CHANGE `active` `active` tinyint(1) NULL DEFAULT '1'");
        await queryRunner.query(
            'ALTER TABLE `order_options` CHANGE `id` `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT',
        );
        await queryRunner.query('ALTER TABLE `user_addresses` ADD `updatedAt` datetime NOT NULL');
        await queryRunner.query('ALTER TABLE `user_addresses` ADD `createdAt` datetime NOT NULL');
        await queryRunner.query('ALTER TABLE `favorite_products` ADD `updatedAt` datetime NOT NULL');
        await queryRunner.query('ALTER TABLE `favorite_products` ADD `createdAt` datetime NOT NULL');
        await queryRunner.query('ALTER TABLE `coupon_users` ADD `updatedAt` datetime NOT NULL');
        await queryRunner.query('ALTER TABLE `coupon_users` ADD `createdAt` datetime NOT NULL');
        await queryRunner.query('ALTER TABLE `coupon_products` ADD `updatedAt` datetime NOT NULL');
        await queryRunner.query('ALTER TABLE `coupon_products` ADD `createdAt` datetime NOT NULL');
        await queryRunner.query('ALTER TABLE `coupon_companies` ADD `updatedAt` datetime NOT NULL');
        await queryRunner.query('ALTER TABLE `coupon_companies` ADD `createdAt` datetime NOT NULL');
        await queryRunner.query('ALTER TABLE `order_products` ADD `productId` int NULL');
        await queryRunner.query('CREATE INDEX `addressId` ON `user_addresses` (`addressId`)');
        await queryRunner.query('CREATE INDEX `productId` ON `favorite_products` (`productId`)');
        await queryRunner.query('CREATE INDEX `userId` ON `coupon_users` (`userId`)');
        await queryRunner.query('CREATE INDEX `productId` ON `coupon_products` (`productId`)');
        await queryRunner.query('CREATE INDEX `companyId` ON `coupon_companies` (`companyId`)');
        await queryRunner.query('CREATE INDEX `productId` ON `order_products` (`productId`)');
        await queryRunner.query(
            'ALTER TABLE `user_addresses` ADD CONSTRAINT `user_addresses_ibfk_2` FOREIGN KEY (`addressId`) REFERENCES `addresses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `user_addresses` ADD CONSTRAINT `user_addresses_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `favorite_products` ADD CONSTRAINT `favorite_products_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `favorite_products` ADD CONSTRAINT `favorite_products_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `coupon_users` ADD CONSTRAINT `coupon_users_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `coupon_users` ADD CONSTRAINT `coupon_users_ibfk_1` FOREIGN KEY (`couponId`) REFERENCES `coupons`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `coupon_products` ADD CONSTRAINT `coupon_products_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `coupon_products` ADD CONSTRAINT `coupon_products_ibfk_1` FOREIGN KEY (`couponId`) REFERENCES `coupons`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `coupon_companies` ADD CONSTRAINT `coupon_companies_ibfk_2` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `coupon_companies` ADD CONSTRAINT `coupon_companies_ibfk_1` FOREIGN KEY (`couponId`) REFERENCES `coupons`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `companies` ADD CONSTRAINT `companies_ibfk_2` FOREIGN KEY (`addressId`) REFERENCES `addresses`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `companies` ADD CONSTRAINT `companies_ibfk_1` FOREIGN KEY (`companyTypeId`) REFERENCES `company_types`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `view_areas` ADD CONSTRAINT `view_areas_ibfk_1` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `delivery_areas` ADD CONSTRAINT `delivery_areas_ibfk_1` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `company_metas` ADD CONSTRAINT `company_metas_ibfk_1` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `categories` ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `products` ADD CONSTRAINT `products_ibfk_4` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `products` ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `sales` ADD CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `order_products` ADD CONSTRAINT `order_products_ibfk_3` FOREIGN KEY (`productRelatedId`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `order_products` ADD CONSTRAINT `order_products_ibfk_2` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `order_products` ADD CONSTRAINT `order_products_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `orders` ADD CONSTRAINT `orders_ibfk_29` FOREIGN KEY (`couponId`) REFERENCES `coupons`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `orders` ADD CONSTRAINT `orders_ibfk_28` FOREIGN KEY (`creditHistoryId`) REFERENCES `credit_history`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `orders` ADD CONSTRAINT `orders_ibfk_27` FOREIGN KEY (`paymentMethodId`) REFERENCES `payment_methods`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `orders` ADD CONSTRAINT `orders_ibfk_26` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `orders` ADD CONSTRAINT `orders_ibfk_25` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `company_payment_methods` ADD CONSTRAINT `company_payment_methods_ibfk_2` FOREIGN KEY (`paymentMethodId`) REFERENCES `payment_methods`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `company_payment_methods` ADD CONSTRAINT `company_payment_methods_ibfk_1` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `deliveries` ADD CONSTRAINT `deliveries_ibfk_4` FOREIGN KEY (`deliveryManId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `deliveries` ADD CONSTRAINT `deliveries_ibfk_3` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `user_metas` ADD CONSTRAINT `user_metas_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `ratings` ADD CONSTRAINT `ratings_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `ratings` ADD CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `ratings` ADD CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `credit_history` ADD CONSTRAINT `credit_history_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `credit_balances` ADD CONSTRAINT `credit_balances_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `company_users` ADD CONSTRAINT `company_users_ibfk_3` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `company_users` ADD CONSTRAINT `company_users_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `company_users` ADD CONSTRAINT `company_users_ibfk_1` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `order_option_groups` ADD CONSTRAINT `order_option_groups_ibfk_2` FOREIGN KEY (`optionsGroupRelatedId`) REFERENCES `options_groups`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `order_option_groups` ADD CONSTRAINT `order_option_groups_ibfk_1` FOREIGN KEY (`orderProductId`) REFERENCES `order_products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `options_groups` ADD CONSTRAINT `options_groups_ibfk_2` FOREIGN KEY (`maxSelectRestrain`) REFERENCES `options_groups`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `options_groups` ADD CONSTRAINT `options_groups_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `options` ADD CONSTRAINT `options_ibfk_1` FOREIGN KEY (`optionsGroupId`) REFERENCES `options_groups`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `order_options` ADD CONSTRAINT `order_options_ibfk_2` FOREIGN KEY (`optionRelatedId`) REFERENCES `options`(`id`) ON DELETE SET NULL ON UPDATE CASCADE',
        );
        await queryRunner.query(
            'ALTER TABLE `order_options` ADD CONSTRAINT `order_options_ibfk_1` FOREIGN KEY (`orderOptionsGroupId`) REFERENCES `order_option_groups`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
        );
    }
}
