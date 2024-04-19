import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from './users.service';
import { UserDocument } from './user.schema';
import { faker } from '@faker-js/faker';

describe('UsersService', () => {
  let service: UsersService;
  let userModel: Model<UserDocument>;
  const userId = '6567a2ad2127d4eac55bac56';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<UsersService>(UsersService);
    userModel = module.get<Model<UserDocument>>(getModelToken('User'));
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = [
        {
          _id: faker.string.uuid(),
          fullName: faker.person.fullName(),
          password: faker.internet.password(),
          email: faker.internet.email(),
          status: 'Developing',
          profesionalRole: 'FullStack Developer',
          state: 'Active',
          profilePicture: faker.image.url(),
          organization: faker.company.name(),
          key: faker.string.alphanumeric(64),
          iv: faker.string.alphanumeric(32),
          __v: 0,
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue({
        status: 200,
        message: 'Users returned',
        data: users,
      });

      const result = await service.findAll();

      expect(result).toEqual({
        status: 200,
        message: 'Users returned',
        data: users,
      });
    });

    it('should handle errors', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockRejectedValueOnce(new Error('Internal server error'));

      await expect(service.findAll()).rejects.toThrow(
        new Error('Internal server error'),
      );
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const user = { fullName: 'John' };
      jest.spyOn(userModel, 'findById').mockReturnValueOnce(user as any);

      const result = await service.findOne(userId);

      expect(userModel.findById).toHaveBeenCalledWith({ _id: userId });
      expect(result).toEqual({
        status: 200,
        message: 'User returned',
        data: user,
      });
    });

    it('should handle not found error', async () => {
      jest.spyOn(userModel, 'findById').mockResolvedValueOnce(null);

      await expect(service.findOne(userId)).rejects.toThrow(
        new Error('Not user found'),
      );
    });

    it('should handle invalid id error', async () => {
      jest.spyOn(userModel, 'findById').mockRejectedValueOnce('Invalid id');

      await expect(service.findOne('invalid')).rejects.toThrow(
        new Error('Invalid id'),
      );
    });
  });

  describe('update', () => {
    it('should update a user by id', async () => {
      const user = { fullName: 'John' };
      jest.spyOn(userModel, 'findById').mockReturnValueOnce(user as any);
      jest
        .spyOn(userModel, 'findOneAndUpdate')
        .mockReturnValueOnce(user as any);

      const result = await service.update(userId, { status: 'New status' });

      expect(userModel.findById).toHaveBeenCalledWith({ _id: userId });
      expect(userModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: userId },
        { status: 'New status' },
        { new: true },
      );
      expect(result).toEqual({
        status: 200,
        message: 'User updated and returned',
        data: user,
      });
    });

    it('should handle not found error', async () => {
      jest.spyOn(userModel, 'findById').mockReturnValueOnce(null);

      await expect(
        service.update(userId, { status: 'New status' }),
      ).rejects.toThrow(new Error('Not user found'));
    });

    it('should handle update error', async () => {
      jest
        .spyOn(userModel, 'findById')
        .mockReturnValueOnce({ status: 'New status' } as any);
      jest
        .spyOn(userModel, 'findOneAndUpdate')
        .mockRejectedValueOnce('Internal server error');

      await expect(
        service.update(userId, { status: 'New status' }),
      ).rejects.toThrow(new Error('Internal server error'));
    });
  });

  describe('remove', () => {
    it('should remove a user by id', async () => {
      const user = { fullName: 'John' };
      jest.spyOn(userModel, 'findById').mockReturnValueOnce(user as any);
      jest.spyOn(userModel, 'deleteOne').mockResolvedValueOnce({} as any);

      const result = await service.remove(userId);

      expect(userModel.findById).toHaveBeenCalledWith({ _id: userId });
      expect(userModel.deleteOne).toHaveBeenCalledWith({ _id: userId });
      expect(result).toEqual({
        status: 200,
        message: 'User deleted',
      });
    });

    it('should handle not found error', async () => {
      jest.spyOn(userModel, 'findById').mockReturnValueOnce(null);

      await expect(service.remove(userId)).rejects.toThrowError(
        /User not found/,
      );
    });

    it('should handle remove error', async () => {
      jest
        .spyOn(userModel, 'findById')
        .mockReturnValueOnce({ fullName: 'John' } as any);
      jest
        .spyOn(userModel, 'deleteOne')
        .mockRejectedValueOnce('Internal server error');

      await expect(service.remove(userId)).rejects.toThrow(
        new Error('Internal server error'),
      );
    });
  });
});
