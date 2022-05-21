import podcastsRepository from '../repositories/podcasts.repository';
import { Exception } from '../utils/exception';

const listPodcastsByUser = async (userId: number) => {
  const podcasts = await podcastsRepository.listByUserId(userId);
  return podcasts;
};

const getPodcastById = async (podcastId: number) => {
  const podcast = await podcastsRepository.getById(podcastId);
  if (!podcast) {
    throw new Exception({
      status: 404,
      message: 'Podcast not found',
    });
  }

  return podcast;
};

export default {
  listPodcastsByUser,
  getPodcastById,
};
