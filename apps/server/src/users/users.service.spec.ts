import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from './users.service';
import { UserDocument } from './user.schema';

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
          _id: '65f47c4f431b47fa12f6a317',
          fullName: 'Amy Watts',
          password: '8631dc054cbef6e97d',
          email: 'amywatts24@gmail.com',
          status: 'Developing',
          profesionalRole: 'FullStack Developer',
          state: 'Active',
          profilePicture:
            'https://images.unsplash.com/photo-1614460132343-62aa9fa8d6f6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          organization: 'lucasOrg',
          key: '59fb95e0c31ab695f14bc42887dc130dcee47f68be774a513516ceba86f140e5',
          iv: '379ccb9aef87362d8d1f58e3815b3d2e',
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

      await expect(service.findOne(userId)).rejects.toThrowError(
        new Error('Not user found'),
      );
    });

    it('should handle invalid id error', async () => {
      jest.spyOn(userModel, 'findById').mockRejectedValueOnce('Invalid id');

      await expect(service.findOne('invalid')).rejects.toThrowError(
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
      ).rejects.toThrowError(new Error('Cannot update user'));
    });

    it('should handle update error', async () => {
      jest
        .spyOn(userModel, 'findById')
        .mockReturnValueOnce({ status: 'New status' } as any);
      jest
        .spyOn(userModel, 'findOneAndUpdate')
        .mockRejectedValueOnce('Update error');

      await expect(
        service.update(userId, { status: 'New status' }),
      ).rejects.toThrowError(new Error('Cannot update user'));
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
      jest.spyOn(userModel, 'deleteOne').mockRejectedValueOnce('Remove error');

      await expect(service.remove(userId)).rejects.toThrowError(
        new Error('Remove error'),
      );
    });
  });
});
