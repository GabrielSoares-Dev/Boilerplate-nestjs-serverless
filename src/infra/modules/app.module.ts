import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '@infra/modules/logger.module';
import { UserModule } from '@infra/modules/user.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule, LoggerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
