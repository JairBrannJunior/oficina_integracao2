import jwt from 'jsonwebtoken';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import usersRepository from '../repositories/users.repository';
import { Exception } from '../utils/exception';

type LoginPayload = {
  email: string;
  password: string;
};

const login = async (payload: LoginPayload) => {
  const user = await usersRepository.findByEmail(payload.email);

  if (!user) {
    throw new Exception({
      status: 401,
      message: 'User not found',
    });
  }

  if (!(await bcrypt.compare(payload.password, user.password))) {
    throw new Exception({
      status: 401,
      message: 'Invalid password',
    });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });

  return {
    token,
    user: _.omit(user, ['password']),
  };
};

export default {
  login,
};
