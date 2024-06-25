import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '@infra/modules/app.module';
import { HttpStatus } from '@nestjs/common';
import { create } from '@test/helpers/db/factory/role.factory';
import { faker } from '@faker-js/faker';
import * as request from 'supertest';

const path = '/v1/role';

const input = {
  name: faker.person.firstName(),
  description: 'test',
};

describe('Create Role', () => {
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

  it('Should be create role with success', () => {
    const expectedStatusCode = HttpStatus.CREATED;
    const expectedResponse = {
      statusCode: expectedStatusCode,
      message: 'Role created successfully',
    };
    return request(app.getHttpServer())
      .post(path)
      .send(input)
      .expect(expectedStatusCode)
      .expect(expectedResponse);
  });

  it('Should be failure when role already exists', async () => {
    const roleCreatedBefore = await create();

    const expectedStatusCode = HttpStatus.BAD_REQUEST;
    const expectedResponse = {
      statusCode: expectedStatusCode,
      message: 'Role already exists',
    };

    const input = {
      name: roleCreatedBefore.name,
      description: 'test',
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
