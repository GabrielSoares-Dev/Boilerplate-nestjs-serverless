import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@infra/modules/user.module';
import { LoggerModule } from '@infra/modules/logger.module';
import { PrismaModule } from '@infra/modules/prisma.module';
import * as request from 'supertest';

describe('Create User', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule, LoggerModule, PrismaModule, ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env.test',
      }),],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Should be create user with success', () => {
    return request(app.getHttpServer())
      .post('/user')
      .expect(200)
      .expect('Hello World!');
  });
});
