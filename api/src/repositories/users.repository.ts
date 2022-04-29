import User from '../models/User';

const findByEmail = async (email: string) => {
  return User.findOne({ where: { email } });
};

export default {
  findByEmail,
};
