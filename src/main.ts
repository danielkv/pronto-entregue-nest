import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtUserAuthGuard } from './modules/auth/guards/jwt-user-auth.guard';
import { JwtCompanyAuthGuard } from './modules/auth/guards/jwt-company-auth.guard';
import { GetRequestHelper } from './modules/common/helpers/get-request.helper';
import * as dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

// define dayjslocale
dayjs.locale('pt-br');

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const getRequestHelper = new GetRequestHelper();
    app.useGlobalGuards(new JwtUserAuthGuard(getRequestHelper), new JwtCompanyAuthGuard(getRequestHelper));

    await app.listen(4001);
}
bootstrap();
