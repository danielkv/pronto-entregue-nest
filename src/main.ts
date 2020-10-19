import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtUserAuthGuard } from './modules/auth/guards/jwt-user-auth.guard';
import { JwtCompanyAuthGuard } from './modules/auth/guards/jwt-company-auth.guard';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalGuards(new JwtUserAuthGuard(), new JwtCompanyAuthGuard());

    await app.listen(4001);
}
bootstrap();
