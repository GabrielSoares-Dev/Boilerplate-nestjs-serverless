import { LOGGER_SERVICE_TOKEN } from '@application';

export const loggerMock = {
  provide: LOGGER_SERVICE_TOKEN,
  useValue: {
    info: jest.fn(),
    debug: jest.fn(),
    error: jest.fn(),
    warning: jest.fn(),
    fatal: jest.fn(),
  },
};
