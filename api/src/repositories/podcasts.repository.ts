import { IPodcast } from '../interfaces/podcast.interface';
import Podcast from '../models/Podcast';

const listByUserId = async (userId: number) => {
  return Podcast.findAll({ where: { userId } });
};

const getById = async (podcastId: number) => {
  return Podcast.findOne({ where: { id: podcastId } });
};

const add = async (userId: number, podcast: IPodcast) => {
  return Podcast.create({
    ...podcast,
    userId,
  });
};

export default {
  listByUserId,
  getById,
  add,
};
