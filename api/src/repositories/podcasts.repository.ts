import Podcast from '../models/Podcast';

const listByUserId = async (userId: number) => {
  return Podcast.findAll({ where: { userId } });
};

const getById = async (podcastId: number) => {
  return Podcast.findOne({ where: { id: podcastId } });
};

export default {
  listByUserId,
  getById,
};
