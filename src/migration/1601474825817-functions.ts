import { MigrationInterface, QueryRunner } from 'typeorm';

export class functions1601474825817 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query('DROP FUNCTION IF EXISTS `COMPANY_ALLOW_BUY_CLOSED`');
        queryRunner.query(
            "CREATE FUNCTION `COMPANY_ALLOW_BUY_CLOSED`(allowBuyClosed TEXT, allowBuyClosedTimeBefore INT, businessHours JSON) RETURNS text CHARSET latin1 \
			BEGIN \
				DECLARE now DATETIME DEFAULT NOW(); \
				SET @isOpen = COMPANY_IS_OPEN(businessHours); \
				 \
				IF allowBuyClosed = 'false' OR allowBuyClosed IS NULL OR @isOpen THEN RETURN NULL; END IF; \
			 \
				SET @nextOpenHour = COMPANY_NEXT_OPEN_DATE(businessHours, now); \
				if @nextOpenHour IS NULL THEN RETURN NULL; END IF; \
				 \
				SET @timeDiff = TIMESTAMPDIFF(minute, now, @nextOpenHour); \
				IF (allowBuyClosedTimeBefore > 0 AND @timeDiff > allowBuyClosedTimeBefore) THEN RETURN NULL; END IF; \
			 \
				RETURN allowBuyClosed; \
			END",
        );

        queryRunner.query('DROP FUNCTION IF EXISTS `COMPANY_ALLOW_BUY_CLOSED_BY_ID`');
        queryRunner.query(
            "CREATE FUNCTION `COMPANY_ALLOW_BUY_CLOSED_BY_ID`(companyId int) RETURNS text CHARSET latin1 \
			BEGIN \
				DECLARE allowBuyClosed TEXT; \
				DECLARE allowBuyClosedTimeBefore INT; \
				DECLARE businessHours JSON; \
				 \
				SET allowBuyClosed = (SELECT company_metas.value FROM company_metas WHERE company_metas.key = 'allowBuyClosed' AND company_metas.companyId = companyId); \
				SET allowBuyClosedTimeBefore = (SELECT company_metas.value FROM company_metas WHERE company_metas.key = 'allowBuyClosedTimeBefore' AND company_metas.companyId = companyId); \
				SET businessHours = (SELECT company_metas.value FROM company_metas WHERE company_metas.key = 'businessHours' AND company_metas.companyId = companyId); \
				 \
				RETURN COMPANY_ALLOW_BUY_CLOSED(allowBuyClosed, allowBuyClosedTimeBefore, businessHours); \
			END",
        );

        queryRunner.query('DROP FUNCTION IF EXISTS `COMPANY_BUSINESS_DAY`');
        queryRunner.query(
            "CREATE FUNCTION `COMPANY_BUSINESS_DAY`(businessHours JSON, datetime DATETIME) RETURNS text CHARSET utf8mb4 \
			BEGIN \
				DECLARE count INT DEFAULT 0; \
				DECLARE fromHour text; \
				DECLARE toHour text; \
				DECLARE weekDay INT DEFAULT WEEKDAY(datetime) +1; \
				DECLARE businessDay JSON; \
				DECLARE businessDayLength INT; \
				DECLARE emptyHours INT DEFAULT 0; \
				DECLARE formatedFrom DATETIME DEFAULT NULL; \
				DECLARE formatedTo DATETIME DEFAULT NULL; \
				 \
				IF (weekDay > 6) THEN SET weekDay = 0; END IF; \
				 \
				SET businessDay = JSON_EXTRACT(businessHours, CONCAT('$[', weekDay, '].hours')); \
				SET businessDayLength = JSON_LENGTH(businessDay); \
				 \
				WHILE count < businessDayLength DO \
					SET fromHour = JSON_UNQUOTE(JSON_EXTRACT(businessDay, CONCAT('$[', count, '].from'))); \
					SET toHour = JSON_UNQUOTE(JSON_EXTRACT(businessDay, CONCAT('$[', count, '].to'))); \
					 \
					if fromHour = '' OR toHour = '' THEN \
						SET businessDay = JSON_REPLACE(businessDay, CONCAT('$[', count, ']'), NULL); \
						SET emptyHours = emptyHours + 1; \
					ELSE \
						SET formatedFrom = STR_TO_DATE(CONCAT(DATE(datetime), ' ', fromHour), '%Y-%m-%d %H:%i'); \
						SET formatedTo = STR_TO_DATE(CONCAT(DATE(datetime), ' ', toHour), '%Y-%m-%d %H:%i'); \
						  \
						SET businessDay = JSON_REPLACE(businessDay, CONCAT('$[', count, '].from'), formatedFrom); \
						SET businessDay = JSON_REPLACE(businessDay, CONCAT('$[', count, '].to'), formatedTo); \
					END IF; \
					 \
					SET count = count + 1; \
				END WHILE; \
				 \
				IF emptyHours = businessDayLength THEN \
					RETURN null; \
				END IF; \
				 \
				RETURN businessDay; \
			END",
        );

        queryRunner.query('DROP FUNCTION IF EXISTS `COMPANY_IS_OPEN`');
        queryRunner.query(
            "CREATE FUNCTION `COMPANY_IS_OPEN`(columnName TEXT) RETURNS tinyint(1) \
			BEGIN \
				DECLARE count INT DEFAULT 0; \
				DECLARE isOpen boolean default false; \
				 \
				SET @now = NOW(); \
				SET @businessDay = COMPANY_BUSINESS_DAY(columnName, @now); \
				 \
				WHILE isOpen = false AND count < JSON_LENGTH(@businessDay) DO \
					SET @from = JSON_UNQUOTE(JSON_EXTRACT(@businessDay, CONCAT('$[', count, '].from'))); \
					SET @to = JSON_UNQUOTE(JSON_EXTRACT(@businessDay, CONCAT('$[', count, '].to'))); \
					 \
					IF (@now BETWEEN @from AND @to) THEN SET isOpen = true; END IF; \
					 \
					SET count = count + 1; \
				END WHILE; \
					 \
				RETURN isOpen; \
			END",
        );

        queryRunner.query('DROP FUNCTION IF EXISTS `COMPANY_NEXT_OPEN_DATE`');
        queryRunner.query(
            "CREATE FUNCTION `COMPANY_NEXT_OPEN_DATE`(businessHours json, fromDay DATETIME) RETURNS datetime \
			BEGIN \
				DECLARE businessDay TEXT; \
				 \
				SET @nextOpenHourFrom = null; \
				SET @nextOpenHourTo = NULL; \
				SET @searchDay = fromDay; \
			 \
				IF (businessHours IS NULL) THEN RETURN NULL; END IF; \
				 \
				SET @count = 0; \
				SET @max = JSON_LENGTH(businessHours); \
			 \
				WHILE @count < @max AND (@nextOpenHourFrom is null OR @nextOpenHourFrom < fromDay) DO \
					SET businessDay = COMPANY_BUSINESS_DAY(businessHours, @searchDay); \
					SET @dayLength = JSON_LENGTH(businessDay); \
					SET @countHour = 0; \
					 \
					IF businessDay IS NOT NULL THEN \
						WHILE (@countHour < @dayLength AND (@nextOpenHourFrom IS NULL OR @nextOpenHourFrom < fromDay)) DO \
							SET @tempFrom = JSON_UNQUOTE(JSON_EXTRACT(businessDay, CONCAT('$[', @countHour, '].from'))); \
							SET @tempTo = JSON_UNQUOTE(JSON_EXTRACT(businessDay, CONCAT('$[', @countHour, '].to'))); \
							 \
							IF (@tempFrom IS NOT NULL AND @tempTo IS NOT NULL) THEN \
								SET @nextOpenHourFrom = @tempFrom; \
								SET @nextOpenHourTo = @tempTo; \
							END IF; \
							 \
							SET @countHour = @countHour +1; \
							 \
						END WHILE; \
					END IF; \
			 \
					SET @count = @count +1; \
					SET @searchDay = DATE_ADD(@searchDay, INTERVAL 1 DAY); \
				END WHILE; \
					 \
				RETURN @nextOpenHourFrom; \
			END",
		);
		
        queryRunner.query('DROP FUNCTION IF EXISTS `COMPANY_NEXT_CLOSE_DATE`');
        queryRunner.query(
            "CREATE FUNCTION `COMPANY_NEXT_CLOSE_DATE`(businessHours JSON) RETURNS datetime \
			BEGIN \
				DECLARE fromDate DATETIME; \
				DECLARE toDate DATETIME; \
				DECLARE nextBusinessDayFrom DATETIME; \
				DECLARE nextBusinessDayTo DATETIME; \
				 \
				SET @day = NOW(); \
				SET @isOpen = COMPANY_IS_OPEN(businessHours); \
				 \
				IF !@isOpen THEN RETURN NULL; END IF; \
				 \
				SET @businessDay = COMPANY_BUSINESS_DAY(businessHours, @day); \
				SET @count = 0; \
				 \
				SET fromDate = JSON_UNQUOTE(JSON_EXTRACT(@businessDay, CONCAT('$[', @count, '].from'))); \
				SET toDate = JSON_UNQUOTE(JSON_EXTRACT(@businessDay, CONCAT('$[', @count, '].to'))); \
				 \
				WHILE @count < 2 AND !(@day BETWEEN fromDate AND toDate) DO \
					SET fromDate = JSON_UNQUOTE(JSON_EXTRACT(@businessDay, CONCAT('$[', @count, '].from'))); \
					SET toDate = JSON_UNQUOTE(JSON_EXTRACT(@businessDay, CONCAT('$[', @count, '].to'))); \
					SET @count = @count +1; \
				END WHILE; \
					 \
				SET @lastMinute = CONCAT(DATE(@day), ' 23:59:00'); \
				 \
				IF (TIMESTAMPDIFF(MINUTE, toDate, @lastMinute) = 0) THEN \
					SET @nextDay = DATE_ADD(@day, INTERVAL 1 DAY); \
					SET @nextBusinessDayJSON = COMPANY_BUSINESS_DAY(businessHours, @nextDay); \
					SET nextBusinessDayFrom = JSON_UNQUOTE(JSON_EXTRACT(@nextBusinessDayJSON, CONCAT('$[0].from'))); \
					SET nextBusinessDayTo = JSON_UNQUOTE(JSON_EXTRACT(@nextBusinessDayJSON, CONCAT('$[0].to'))); \
					 \
					IF (nextBusinessDayFrom AND nextBusinessDayTo) THEN \
						SET @firstMinute = CONCAT(DATE(@nextDay), ' 00:00:00'); \
						IF (TIMESTAMPDIFF(MINUTE, nextBusinessDayFrom, @firstMinute) = 0) THEN SET toDate = nextBusinessDayTo; END IF; \
					END IF; \
				END IF; \
			 \
				RETURN toDate; \
			END",
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query('DROP FUNCTION IF EXISTS `COMPANY_ALLOW_BUY_CLOSED`');
        queryRunner.query('DROP FUNCTION IF EXISTS `COMPANY_ALLOW_BUY_CLOSED_BY_ID`');
        queryRunner.query('DROP FUNCTION IF EXISTS `COMPANY_BUSINESS_DAY`');
        queryRunner.query('DROP FUNCTION IF EXISTS `COMPANY_IS_OPEN`');
        queryRunner.query('DROP FUNCTION IF EXISTS `COMPANY_NEXT_OPEN_DATE`');
        queryRunner.query('DROP FUNCTION IF EXISTS `COMPANY_NEXT_CLOSE_DATE`');
    }
    }
}
