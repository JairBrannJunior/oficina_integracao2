import Podcast from '../models/Podcast';

const listByUserId = async (userId: number) => {
  return Podcast.findAll({ where: { userId } });
};

export default {
  listByUserId,
};
