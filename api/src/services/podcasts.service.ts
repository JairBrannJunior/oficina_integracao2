import { IPodcast } from '../interfaces/podcast.interface';
import podcastsRepository from '../repositories/podcasts.repository';
import { Exception } from '../utils/exception';

const listPodcastsByUser = async (userId: number) => {
  const podcasts = await podcastsRepository.listByUserId(userId);
  return podcasts;
};

const getPodcastById = async (userId: number, podcastId: number) => {
  const podcast = await podcastsRepository.getById(podcastId);
  if (!podcast) {
    throw new Exception({
      status: 404,
      message: 'Podcast not found',
    });
  }

  if (podcast.userId !== userId) {
    throw new Exception({
      status: 403,
      message: 'This podcast is not linked to your account',
    });
  }

  return podcast;
};

const addPodcast = async (userId: number, podcast: IPodcast) => {
  const newPodcast = await podcastsRepository.add(userId, podcast);
  return newPodcast;
};

const updatePodcastById = async (userId: number, podcastId: number, podcast: Partial<IPodcast>) => {
  const [updatedPodcast] = await podcastsRepository.updateById(userId, podcastId, podcast);

  if (updatedPodcast === 0) {
    throw new Exception({
      status: 404,
      message: 'Podcast not found',
    });
  }

  return updatedPodcast;
};

const deletePodcastById = async (userId: number, podcastId: number) => {
  const deletedPodcast = await podcastsRepository.deleteById(userId, podcastId);

  if (deletedPodcast === 0) {
    throw new Exception({
      status: 404,
      message: 'Podcast not found',
    });
  }

  return deletedPodcast;
};

export default {
  listPodcastsByUser,
  getPodcastById,
  addPodcast,
  updatePodcastById,
  deletePodcastById,
};
