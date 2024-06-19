import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '@infra';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), LoggerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
