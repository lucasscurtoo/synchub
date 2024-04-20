import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { CryptoService } from 'src/services/crypto.service';
import { getModelToken } from '@nestjs/mongoose';
import { faker } from '@faker-js/faker';
import { User } from 'src/users/user.schema';
import { Model } from 'mongoose';
import { HttpException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const userModelMock = {
      findOne: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        CryptoService,
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: userModelMock,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should throw an error if the user is not found', async () => {
      const loginAuthDto = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      const userModelMock: Partial<Model<User>> = {
        findOne: jest.fn().mockResolvedValue(null),
        create: jest.fn(),
      };

      authService = new AuthService(userModelMock as any, new CryptoService());

      await expect(controller.login(loginAuthDto)).rejects.toThrow(
        HttpException,
      );
    });
  });

  describe('register', () => {
    it('should call authService.register with the provided registerAuthDto', () => {
      const registerAuthDto = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      const registerSpy = jest.spyOn(authService, 'register');

      controller.register(registerAuthDto);

      expect(registerSpy).toHaveBeenCalledWith(registerAuthDto);
    });
  });
});
