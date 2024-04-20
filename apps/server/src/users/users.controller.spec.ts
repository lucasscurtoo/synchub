import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { ApiResponse } from 'src/types';
import { faker } from '@faker-js/faker';

const createFakeUser = () => {
  return {
    _id: faker.string.alphanumeric(24),
    fullName: faker.person.fullName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    status: faker.helpers.arrayElements(['Developing', 'Testing', 'Deploying']),
    profesionalRole: faker.helpers.arrayElement([
      'FullStack Developer',
      'Frontend Developer',
      'Backend Developer',
    ]),
    state: faker.helpers.arrayElement(['Active', 'Offline', 'Busy']),
    profilePicture: faker.image.url(),
    key: faker.string.alphanumeric(32),
    iv: faker.string.alphanumeric(16),
    __v: 0,
  };
};

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: {
            find: jest.fn(),
            findById: jest.fn(),
            deleteOne: jest.fn(),
            findOneAndUpdate: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [createFakeUser()];
      jest
        .spyOn(service, 'findAll')
        .mockResolvedValue(result as unknown as ApiResponse);
      expect(await controller.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const result = createFakeUser();
      const id = faker.string.alphanumeric(24);
      jest
        .spyOn(service, 'findOne')
        .mockResolvedValue(result as unknown as ApiResponse);
      expect(await controller.findOne(id)).toEqual(result);
    });
  });

  describe('update', () => {
    it('should update a user by id', async () => {
      const result = createFakeUser();
      const id = faker.string.alphanumeric(24);
      const updateUserDto = { fullName: faker.person.fullName() };
      jest
        .spyOn(service, 'update')
        .mockResolvedValue(result as unknown as ApiResponse);
      expect(await controller.update(id, updateUserDto)).toEqual(result);
    });
  });

  describe('remove', () => {
    it('should remove a user by id', async () => {
      const result = createFakeUser();
      const id = faker.string.alphanumeric(24);
      jest
        .spyOn(service, 'remove')
        .mockResolvedValue(result as unknown as ApiResponse);
      expect(await controller.remove(id)).toEqual(result);
    });
  });
});
