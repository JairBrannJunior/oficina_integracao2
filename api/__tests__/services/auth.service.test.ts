import usersRepository from '../../src/repositories/users.repository';
import authService from '../../src/services/auth.service';
import bcrypt from 'bcrypt';

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error when user not found', async () => {
    const user = {
      email: 'test@test.com',
      password: '123',
    };

    jest.spyOn(usersRepository, 'findByEmail').mockReturnValueOnce(Promise.resolve(null));

    try {
      await authService.login(user);
    } catch (error: any) {
      expect(error.statusCode).toBe(401);
      expect(error.message).toBe('User not found');
    }
  });

  it('should throw an error when password is invalid', async () => {
    const user = {
      email: 'test@test.com',
      password: '123',
    };

    jest.spyOn(usersRepository, 'findByEmail').mockReturnValueOnce(Promise.resolve(user) as any);

    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => Promise.resolve(false));

    try {
      await authService.login(user);
    } catch (error: any) {
      expect(error.statusCode).toBe(401);
      expect(error.message).toBe('Invalid password');
    }
  });

  it('should return a token when user is valid', async () => {
    const user = {
      email: 'test@test.com',
      password: '123',
    };

    const insertedUser = {
      id: 1,
      name: 'test',
      email: 'test@test.com',
      password: await bcrypt.hash(user.password, 10),
    };

    jest.spyOn(usersRepository, 'findByEmail').mockReturnValueOnce(Promise.resolve(insertedUser) as any);

    const loginResponse = await authService.login(user);
    expect(loginResponse.token).toBeDefined();
    expect(loginResponse.user).toBeDefined();
  });
});
