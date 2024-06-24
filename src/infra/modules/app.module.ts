import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '@infra/modules/logger.module';
import { UserModule } from '@infra/modules/user.module';
import { PermissionModule } from './permission.module';
import { PrismaModule } from '@infra/modules/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule,
    PrismaModule,
    UserModule,
    PermissionModule,
  ],
})
export class AppModule {}
