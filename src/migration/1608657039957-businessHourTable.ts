import { ConvertTimeHelper } from 'src/modules/common/helpers/convertTime.helper';
import { BusinessHourDTO } from 'src/modules/company-association/business-hour/dtos/business-hour.dto';
import { BusinessHour } from 'src/modules/company-association/business-hour/entities/business-hour.entity';
import { CompanyMeta } from 'src/modules/company-association/company-meta/entities/company.meta.entity';
import { DeepPartial, MigrationInterface, QueryRunner } from 'typeorm';

export class businessHourTable1608657039957 implements MigrationInterface {
    name = 'businessHourTable1608657039957';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'CREATE TABLE `business_hours` (`id` int NOT NULL AUTO_INCREMENT, `companyId` int NOT NULL, `dayOfWeek` int NOT NULL, `start` int NOT NULL, `end` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
        );
        await queryRunner.query(
            'ALTER TABLE `business_hours` ADD CONSTRAINT `FK_86b466fbd9fbd174f91612f7567` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
        );

        const convertTime = new ConvertTimeHelper();

        const companyMetaRepository = queryRunner.connection.getRepository(CompanyMeta);
        const businessHourRepository = queryRunner.connection.getRepository(BusinessHour);

        const metas = await companyMetaRepository.find({ where: { key: 'businessHours' } });

        const businessHours: DeepPartial<BusinessHourDTO>[] = [];

        metas.forEach(meta => {
            let dayOfWeek = 0;
            const companyId = meta.companyId;

            JSON.parse(meta.value).forEach(day => {
                day.hours.forEach(hour => {
                    if (!hour.from || !hour.to) return;

                    const start = convertTime.readableTimeToMinutes(hour.from);
                    const end = convertTime.readableTimeToMinutes(hour.to);

                    if (!start && !end) return;

                    businessHours.push({
                        start,
                        end,
                        companyId,
                        dayOfWeek,
                    });
                });

                dayOfWeek++;
            });
        });

        await businessHourRepository.insert(businessHours);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `business_hours` DROP FOREIGN KEY `FK_86b466fbd9fbd174f91612f7567`');
        await queryRunner.query('DROP TABLE `business_hours`');
    }
}
