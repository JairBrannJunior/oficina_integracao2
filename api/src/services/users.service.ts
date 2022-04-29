import User from '../models/User';
import usersRepository from '../repositories/users.repository';
import { Exception } from '../utils/exception';

const createUser = async (payload: any) => {
  const existingUser = await usersRepository.findByEmail(payload.email);

  if (existingUser) {
    throw new Exception({
      status: 409,
      message: 'User already exists',
    });
  }

  const user = await User.create(payload);
  return user;
};

export default {
  createUser,
};