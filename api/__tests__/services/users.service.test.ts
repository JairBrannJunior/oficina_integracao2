import bcrypt from 'bcrypt';
import usersRepository from '../../src/repositories/users.repository';
import usersService from '../../src/services/users.service';

describe('UsersService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a user', async () => {
    const user = {
      name: 'test',
      email: 'test@test.com',
      password: 'test',
    };

    const insertedUser = {
      id: 1,
      name: user.name,
      email: user.email,
      password: await bcrypt.hash(user.password, 10),
    };

    jest.spyOn(usersService, 'createUser').mockReturnValueOnce(Promise.resolve(insertedUser));

    expect(await usersService.createUser(user)).toBe(insertedUser);
  });

  it('should throw an error when user already exists', async () => {
    const user = {
      name: 'test',
      email: 'test@test.com',
      password: 'test',
    };

    jest.spyOn(usersRepository, 'findByEmail').mockReturnValueOnce(
      Promise.resolve({
        id: 1,
        name: 'test',
        email: 'test@test.com',
      })
    );

    let existingUser;
    try {
      existingUser = await usersService.createUser(user);
    } catch (error: any) {
      expect(error.statusCode).toBe(409);
      expect(error.message).toBe('User already exists');
    }

    expect(existingUser).toBeUndefined();
  });
});
