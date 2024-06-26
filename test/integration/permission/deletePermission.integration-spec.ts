import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '@infra/modules/app.module';
import { HttpStatus } from '@nestjs/common';
import { create } from '@test/helpers/db/factories/permission.factory';
import { faker } from '@faker-js/faker';
import * as request from 'supertest';

const path = '/v1/permission';

describe('Delete permission', () => {
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

  it('Should be deleted permission with success', async () => {
    const permissionCreatedBefore = await create();
    const id = permissionCreatedBefore.id;

    const expectedStatusCode = HttpStatus.OK;
    const expectedResponse = {
      statusCode: expectedStatusCode,
      message: 'Permission deleted successfully',
    };

    return request(app.getHttpServer())
      .delete(`${path}/${id}`)
      .expect(expectedStatusCode)
      .expect(expectedResponse);
  });

  it('Should be is invalid id', async () => {
    const id = faker.number.int({ max: 100 });
    const expectedStatusCode = HttpStatus.BAD_REQUEST;
    const expectedResponse = {
      statusCode: expectedStatusCode,
      message: 'Invalid id',
    };

    return request(app.getHttpServer())
      .delete(`${path}/${id}`)
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
      .delete(`${path}/${id}`)
      .expect(expectedStatusCode)
      .expect(expectedResponse);
  });

  afterAll(async () => {
    await app.close();
  });
});
