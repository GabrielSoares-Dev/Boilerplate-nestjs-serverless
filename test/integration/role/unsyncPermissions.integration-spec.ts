import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '@infra/modules/app.module';
import { HttpStatus } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { create as createRole } from '@test/helpers/db/factories/role.factory';
import { create as createPermission } from '@test/helpers/db/factories/permission.factory';
import * as request from 'supertest';

const path = '/v1/role/unsync-permissions';

describe('Unsync permissions', () => {
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

  it('Should be unsync permissions', async () => {
    const createdRoleBefore = await createRole();
    const createdPermissionBefore = await createPermission();

    const input = {
      role: createdRoleBefore.name,
      permissions: [createdPermissionBefore.name],
    };
    const expectedStatusCode = HttpStatus.OK;
    const expectedResponse = {
      statusCode: expectedStatusCode,
      message: 'Role unsync successfully',
    };
    return request(app.getHttpServer())
      .post(path)
      .send(input)
      .expect(expectedStatusCode)
      .expect(expectedResponse);
  });

  it('Should be is invalid role', async () => {
    const input = {
      role: faker.lorem.word(),
      permissions: [faker.lorem.word()],
    };
    const expectedStatusCode = HttpStatus.BAD_REQUEST;
    const expectedResponse = {
      statusCode: expectedStatusCode,
      message: 'Invalid role',
    };
    return request(app.getHttpServer())
      .post(path)
      .send(input)
      .expect(expectedStatusCode)
      .expect(expectedResponse);
  });

  it('Should be is invalid role ', async () => {
    const createdRoleBefore = await createRole();

    const input = {
      role: createdRoleBefore.name,
      permissions: [faker.lorem.word()],
    };
    const expectedStatusCode = HttpStatus.BAD_REQUEST;
    const expectedResponse = {
      statusCode: expectedStatusCode,
      message: 'Invalid permission',
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
      message: [
        'role must be a string',
        'role should not be empty',
        'permissions must contain at least 1 elements',
        'each value in permissions must be a string',
        'permissions must be an array',
      ],
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
