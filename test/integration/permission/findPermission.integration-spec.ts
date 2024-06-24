import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
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

describe('Find permission', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    );
    app.enableVersioning();
    await app.init();
  });

  beforeEach(async () => {
    await deletePermissions();
  });

  it('Should be found permission with success', async () => {
    const id = 99;
    const permission = {
      id,
      name: 'test',
      description: 'test',
      createdAt,
      updatedAt,
    };
    await createPermission(permission);

    const expectedStatusCode = HttpStatus.OK;
    const expectedResponse = {
      statusCode: expectedStatusCode,
      message: 'Permission found',
      content: {
        id,
        name: 'test',
        description: 'test',
        createdAt: createdAt.toISOString(),
        updatedAt: updatedAt.toISOString(),
      },
    };

    return request(app.getHttpServer())
      .get(`${path}/${id}`)
      .expect(expectedStatusCode)
      .expect(expectedResponse);
  });

  it('Should be is invalid id', async () => {
    const id = 300;
    const expectedStatusCode = HttpStatus.BAD_REQUEST;
    const expectedResponse = {
      statusCode: expectedStatusCode,
      message: 'Invalid id',
    };

    return request(app.getHttpServer())
      .get(`${path}/${id}`)
      .expect(expectedStatusCode)
      .expect(expectedResponse);
  });

  it('Should be failure with wrong field', async () => {
    const expectedStatusCode = HttpStatus.UNPROCESSABLE_ENTITY;
    const expectedResponse = {
      message: ['id must be a number string'],
      error: 'Unprocessable Entity',
      statusCode: expectedStatusCode,
    };

    const id = 'test';
    return request(app.getHttpServer())
      .get(`${path}/${id}`)
      .expect(expectedStatusCode)
      .expect(expectedResponse);
  });

  afterAll(async () => {
    await app.close();
  });
});
