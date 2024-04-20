import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserDocument } from 'src/users/user.schema';
import { CryptoService } from 'src/services/crypto.service';
import { faker } from '@faker-js/faker';
import { UsersService } from 'src/users/users.service';

describe('AuthService', () => {
  let service: AuthService;
  let userModel: Model<UserDocument>;
  let cryptoService: CryptoService;
  beforeEach(async () => {
    const userModelMock = {
      findOne: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<AuthService>(AuthService);
    userModel = module.get<Model<UserDocument>>(getModelToken('User'));
    cryptoService = module.get<CryptoService>(CryptoService);
  });

  describe('login', () => {
    it('should return ApiResponse with status OK and user data if login is successful', async () => {
      const loginAuthDto = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };
      const user = {
        email: loginAuthDto.email,
        password: faker.internet.password(),
        key: faker.string.alphanumeric(64),
        iv: faker.string.alphanumeric(32),
        toObject: () => user,
      };

      jest.spyOn(userModel, 'findOne').mockResolvedValue(user as UserDocument);
      jest
        .spyOn(cryptoService, 'decrypt')
        .mockImplementation((encryptedText, key, iv) => {
          if (
            encryptedText === user.password &&
            key.equals(Buffer.from(user.key, 'hex')) &&
            iv.equals(Buffer.from(user.iv, 'hex'))
          ) {
            return Promise.resolve(loginAuthDto.password);
          } else {
            return Promise.reject();
          }
        });

      const result = await service.login(loginAuthDto);

      expect(result).toEqual({
        status: HttpStatus.OK,
        message: 'Login successful',
        data: { ...user, password: undefined },
      });
    });
    it('should throw an error with status NOT_FOUND if user is not found', async () => {
      const loginAuthDto = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      jest.spyOn(userModel, 'findOne').mockResolvedValue(null);

      await expect(service.login(loginAuthDto)).rejects.toThrow(
        new HttpException('User not found', HttpStatus.NOT_FOUND),
      );
    });

    it('should throw an error with status UNAUTHORIZED if password is wrong', async () => {
      const loginAuthDto = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };
      const user = {
        email: loginAuthDto.email,
        password: faker.internet.password(),
        key: faker.string.alphanumeric(64),
        iv: faker.string.alphanumeric(32),
        toObject: () => user,
      };

      jest.spyOn(userModel, 'findOne').mockResolvedValue(user as UserDocument);
      jest
        .spyOn(cryptoService, 'decrypt')
        .mockImplementation((encryptedText, key, iv) => {
          if (
            encryptedText === user.password &&
            key.equals(Buffer.from(user.key, 'hex')) &&
            iv.equals(Buffer.from(user.iv, 'hex'))
          ) {
            return Promise.resolve('wrongPassword');
          }
        });
      await expect(service.login(loginAuthDto)).rejects.toThrow(
        new HttpException('Wrong password', HttpStatus.UNAUTHORIZED),
      );
    });

    it('should throw an error with status INTERNAL_SERVER_ERROR if an error occurs', async () => {
      const loginAuthDto = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      jest
        .spyOn(userModel, 'findOne')
        .mockRejectedValue(new Error('Internal Server Error'));

      await expect(service.login(loginAuthDto)).rejects.toThrow(
        new Error('Internal server error'),
      );
    });
  });

  describe('register', () => {
    it('should return ApiResponse with status CREATED and saved user data if registration is successful', async () => {
      const registerAuthDto = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      const user = {
        fullName: faker.person.fullName(),
        password: faker.internet.password(),
        email: registerAuthDto.email,
        status: faker.helpers.arrayElements([
          'Developing',
          'Testing',
          'Deploying',
        ]),
        profesionalRole: faker.helpers.arrayElement([
          'FullStack Developer',
          'Frontend Developer',
          'Backend Developer',
        ]),
        state: faker.helpers.arrayElement(['Active', 'Offline', 'Busy']),
        profilePicture: faker.image.url(),
      };

      userModel.findOne = jest.fn().mockResolvedValue(null);
      userModel.create = jest.fn().mockResolvedValue(user);

      const result = await service.register(registerAuthDto);

      expect(userModel.findOne).toHaveBeenCalledWith({
        email: registerAuthDto.email,
      });

      expect(userModel.create).toHaveBeenCalled();
      expect(result).toEqual({
        status: HttpStatus.CREATED,
        message: 'User registered successfully',
        data: user,
      });
    });
    it('should throw an error with status BAD_REQUEST if user already exists', async () => {
      const registerAuthDto = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };
      const user = { email: registerAuthDto.email };

      jest.spyOn(userModel, 'findOne').mockResolvedValue(user as UserDocument);

      await expect(service.register(registerAuthDto)).rejects.toThrow(
        new Error('The user already exists'),
      );
    });

    it('should throw an error with status INTERNAL_SERVER_ERROR if an error occurs', async () => {
      const registerAuthDto = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      jest
        .spyOn(userModel, 'findOne')
        .mockRejectedValue(new Error('Internal Server Error'));

      await expect(service.register(registerAuthDto)).rejects.toThrow(
        new Error('Internal server error'),
      );
    });
  });
});
