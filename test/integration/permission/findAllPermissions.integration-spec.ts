import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@infra/modules/app.module';
import { HttpStatus } from '@nestjs/common';
import {
  deletePermissions,
  createPermission,
} from '@test/helpers/db/factory/permission.factory';
import * as request from 'supertest';

const path = '/v1/permission';

const createdAt = new Date();
const updatedAt = new Date();

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

  beforeEach(async () => {
    await deletePermissions();
  });

  it('Should be found permissions with success', async () => {
    const permission = {
      id: 1,
      name: 'test',
      description: 'test',
      createdAt,
      updatedAt,
    };

    await createPermission(permission);
    const expectedStatusCode = HttpStatus.OK;
    const expectedResponse = {
      statusCode: expectedStatusCode,
      message: 'Found permissions',
      content: [
        {
          id: 1,
          name: 'test',
          description: 'test',
          createdAt: createdAt.toISOString(),
          updatedAt: updatedAt.toISOString(),
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
