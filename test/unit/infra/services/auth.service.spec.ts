import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@domain/enums/role.enum';
import { AuthServiceInterface } from '@application/services/auth.service';
import { AuthService } from '@infra/services/auth.service';

describe('AuthService', () => {
  let service: AuthServiceInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('token-test'),
            verifyAsync: jest.fn().mockResolvedValue({ name: 'user' }),
          },
        },
      ],
    }).compile();

    service = module.get<AuthServiceInterface>(AuthService);
  });
  describe('generateToken', () => {
    it('Should be generate token', async () => {
      const input = {
        id: 1,
        name: 'test',
        email: 'test@gmail.com',
        phoneNumber: '11991742156',
        role: Role.ADMIN,
        permissions: ['test'],
      };
      const output = await service.generateToken(input);

      const expectedOutput = 'token-test';
      expect(output).toEqual(expectedOutput);
    });
  });
  describe('verifyToken', () => {
    it('Should be verify token', async () => {
      const input = 'mock-token';
      const output = await service.verifyToken(input);

      const expectedOutput = { name: 'user' };
      expect(output).toEqual(expectedOutput);
    });
  });
});
