import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@infra/modules/app.module';
import { HttpStatus } from '@nestjs/common';
import { create } from '@test/helpers/db/factory/permission.factory';
import * as request from 'supertest';

const path = '/v1/permission';

describe('Find all permissions', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.enableVersioning();
    await app.init();
  });

  it('Should be found permissions with success', async () => {
    const permissionCreatedBefore = await create();

    const expectedStatusCode = HttpStatus.OK;
    const expectedResponse = {
      statusCode: expectedStatusCode,
      message: 'Found permissions',
      content: [
        {
          ...permissionCreatedBefore,
          createdAt: permissionCreatedBefore.createdAt.toISOString(),
          updatedAt: permissionCreatedBefore.updatedAt.toISOString(),
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
