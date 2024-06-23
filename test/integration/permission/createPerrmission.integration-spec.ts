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

const input = {
  name: 'test',
  description: 'test',
};

describe('Create Permission', () => {
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

  it('Should be create permission with success', () => {
    const expectedStatusCode = HttpStatus.CREATED;
    const expectedResponse = {
      statusCode: expectedStatusCode,
      message: 'Permission created successfully',
    };
    return request(app.getHttpServer())
      .post(path)
      .send(input)
      .expect(expectedStatusCode)
      .expect(expectedResponse);
  });

  it('Should be failure when permission already exists', async () => {
    const permission = {
      name: 'test',
      description: 'test',
    };

    await createPermission(permission);

    const expectedStatusCode = HttpStatus.BAD_REQUEST;
    const expectedResponse = {
      statusCode: expectedStatusCode,
      message: 'Permission already exists',
    };
    return request(app.getHttpServer())
      .post(path)
      .send(input)
      .expect(expectedStatusCode)
      .expect(expectedResponse);
  });

  it('Should be failure without fields', () => {
    const expectedStatusCode = HttpStatus.UNPROCESSABLE_ENTITY;
    const expectedResponse = {
      message: ['name must be a string', 'name should not be empty'],
      error: 'Unprocessable Entity',
      statusCode: expectedStatusCode,
    };

    return request(app.getHttpServer())
      .post(path)
      .expect(expectedStatusCode)
      .expect(expectedResponse);
  });

  afterAll(async () => {
    await app.close();
  });
});
