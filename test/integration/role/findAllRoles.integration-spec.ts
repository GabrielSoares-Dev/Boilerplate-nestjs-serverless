import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@infra/modules/app.module';
import { HttpStatus } from '@nestjs/common';
import { create } from '@test/helpers/db/factories/role.factory';
import * as request from 'supertest';

const path = '/v1/role';

describe('Find all roles', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.enableVersioning();
    await app.init();
  });

  it('Should be found roles with success', async () => {
    const roleCreatedBefore = await create();

    const expectedStatusCode = HttpStatus.OK;
    const expectedResponse = {
      statusCode: expectedStatusCode,
      message: 'Found roles',
      content: [
        {
          ...roleCreatedBefore,
          createdAt: roleCreatedBefore.createdAt.toISOString(),
          updatedAt: roleCreatedBefore.updatedAt.toISOString(),
        },
      ],
    };
    return request(app.getHttpServer())
      .get(path)
      .expect(expectedStatusCode)
      .expect(expectedResponse);
  });

  afterAll(async () => {
    await app.close();
  });
});
