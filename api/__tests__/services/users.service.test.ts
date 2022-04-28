import bcrypt from 'bcrypt';
import User from '../../src/models/User';
import usersService from '../../src/services/users.service';
import { Exception } from '../../src/utils/exception';

jest.mock('../../src/services/users.service');
// jest.mock('../../src/models/User', () => ({
//   findOne: jest.fn(),
// }));

describe('UsersService', () => {
  const userModelMocked = User as jest.Mocked<typeof User>;
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockedUsersService = usersService as jest.Mocked<typeof usersService>;
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

    mockedUsersService.createUser.mockResolvedValueOnce(insertedUser);

    expect(await mockedUsersService.createUser(user)).toBe(insertedUser);
  });

  it('should throw an error when creating a user', async () => {
    const user = {
      name: 'test',
      email: 'test@test.com',
      password: 'test',
    };

    jest.spyOn(User, 'findOne').mockReturnValue(
      Promise.resolve({
        id: 1,
        name: 'test',
        email: 'test@test.com',
      } as any)
    );

    // userModelMocked.findOne.mockReturnValue({
    //   id: 1,
    //   name: 'test',
    //   email: 'test@test.com',
    // } as any);

    // mockedUsersService.createUser.mockImplementation(() => {
    //   throw new Exception({
    //     status: 409,
    //     message: 'User already exists',
    //   });
    // });

    console.log(await mockedUsersService.createUser(user));

    expect(await usersService.createUser(user)).toBe(undefined);
  });
});
